/**
 * Receipt Verification API
 * POST /api/receipt-verify — Upload receipt, OCR for vendor + date, upgrade to verified_buyer
 *
 * Privacy: Image is processed in-memory and NEVER stored. Only the extracted
 * vendor name and order date are persisted in the receipt_verifications table.
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createServerClient as createAdminClient } from "@/lib/supabase-server";
import { sendEmail, receiptVerifiedEmail } from "@/lib/email";
import { vendors } from "@/data/vendors";
import { peptides } from "@/data/peptides";
import Tesseract from "tesseract.js";

/** Vendor aliases for fuzzy OCR matching */
const VENDOR_ALIASES: Record<string, string[]> = {
    "amino-club": ["amino club", "aminoclub", "amino-club", "amino.club"],
    "bio-longevity-labs": ["bio longevity", "biolongevity", "bio-longevity", "bio longevity labs"],
    "limitless-life": ["limitless life", "limitless-life", "limitlesslife", "limitless life nootropics"],
    "ascension-peptides": ["ascension", "ascension peptides", "ascensionpeptides"],
    "pantheon-peptides": ["pantheon", "pantheon peptides", "pantheonpeptides"],
    "lvlup-health": ["lvlup", "lvl up", "lvlup health", "level up health"],
};

/** Try to match OCR text to a known vendor */
function matchVendor(ocrText: string): { slug: string; confidence: number } | null {
    const lower = ocrText.toLowerCase();
    let bestMatch: { slug: string; confidence: number } | null = null;

    for (const [slug, aliases] of Object.entries(VENDOR_ALIASES)) {
        for (const alias of aliases) {
            if (lower.includes(alias)) {
                // Longer alias = higher confidence
                const confidence = alias.length / 10;
                if (!bestMatch || confidence > bestMatch.confidence) {
                    bestMatch = { slug, confidence: Math.min(confidence, 1) };
                }
            }
        }
    }
    return bestMatch;
}

/** Try to find a date in the OCR text */
function extractDate(ocrText: string): string | null {
    // Common receipt date formats
    const patterns = [
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](20\d{2})/,         // MM/DD/YYYY or DD-MM-YYYY
        /(20\d{2})[\/\-](\d{1,2})[\/\-](\d{1,2})/,          // YYYY-MM-DD
        /(\w{3,9})\s+(\d{1,2}),?\s*(20\d{2})/i,              // Month DD, YYYY
        /(\d{1,2})\s+(\w{3,9})\s+(20\d{2})/i,                // DD Month YYYY
    ];

    for (const pattern of patterns) {
        const match = ocrText.match(pattern);
        if (match) return match[0];
    }
    return null;
}

function createRouteClient(request: NextRequest) {
    const response = NextResponse.next();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
                },
            },
        }
    );
    return { supabase, response };
}

export async function POST(request: NextRequest) {
    try {
        const { supabase, response } = createRouteClient(request);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

        const formData = await request.formData();
        const file = formData.get("receipt") as File | null;
        const logId = formData.get("log_id") as string | null;
        const expectedVendor = formData.get("vendor_slug") as string | null;

        if (!file || !logId) {
            return NextResponse.json({ error: "receipt file and log_id are required" }, { status: 400 });
        }

        // Validate file type and size
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "Only image files are accepted" }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File must be under 10MB" }, { status: 400 });
        }

        // Verify the log belongs to this user
        const { data: log } = await supabase
            .from("protocol_logs")
            .select("id, user_id, vendor_slug")
            .eq("id", logId)
            .eq("user_id", user.id)
            .single();

        if (!log) {
            return NextResponse.json({ error: "Protocol log not found or not owned by you" }, { status: 404 });
        }

        const vendorSlug = expectedVendor || (log as Record<string, string>).vendor_slug;

        // Process image in memory — convert to buffer for Tesseract
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Run OCR
        const { data: ocrData } = await Tesseract.recognize(buffer, "eng", {
            logger: () => {}, // suppress progress logs
        });

        const ocrText = ocrData.text;
        const ocrConfidence = ocrData.confidence / 100; // normalize to 0-1

        // Match vendor
        const vendorMatch = matchVendor(ocrText);
        const dateFound = extractDate(ocrText);

        // Determine verification result
        const vendorVerified = vendorMatch?.slug === vendorSlug;
        const confidenceThreshold = 0.4;
        const autoVerified = vendorVerified && ocrConfidence >= confidenceThreshold;

        const admin = createAdminClient();

        // Record verification attempt (NO image stored — privacy by design)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (admin.from("receipt_verifications") as any).insert({
            log_id: logId,
            user_id: user.id,
            storage_path: null, // never stored
            ocr_vendor: vendorMatch?.slug || null,
            ocr_date: dateFound,
            ocr_confidence: ocrConfidence,
            verified: autoVerified,
            processed_at: new Date().toISOString(),
        });

        if (autoVerified) {
            // Upgrade log verification level
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (admin.from("protocol_logs") as any)
                .update({ verification_level: "verified_buyer" })
                .eq("id", logId);

            // Upgrade user badge (if not already lab_confirmed)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (admin.from("profiles") as any)
                .update({ badge: "verified_buyer" })
                .eq("id", user.id)
                .neq("badge", "lab_confirmed");

            // Send verification email (fire-and-forget)
            if (user.email) {
                const pepNames = (log as Record<string, string[]>).peptide_slugs?.map(
                    (s: string) => peptides.find(p => p.slug === s)?.name || s
                ) || ["your peptide"];
                sendEmail(user.email, receiptVerifiedEmail({
                    displayName: user.user_metadata?.display_name || "Researcher",
                    peptideNames: pepNames,
                    vendorName: vendors.find(v => v.slug === vendorSlug)?.name || vendorSlug,
                })).catch(() => {});
            }
        }

        const vendorName = vendors.find(v => v.slug === vendorSlug)?.name || vendorSlug;
        const detectedName = vendorMatch
            ? vendors.find(v => v.slug === vendorMatch.slug)?.name || vendorMatch.slug
            : null;

        const jsonResponse = NextResponse.json({
            success: true,
            auto_verified: autoVerified,
            vendor_match: vendorVerified,
            vendor_detected: detectedName,
            vendor_expected: vendorName,
            date_detected: dateFound,
            ocr_confidence: Math.round(ocrConfidence * 100),
            message: autoVerified
                ? "✅ Receipt verified! Your log has been upgraded to Verified Buyer."
                : vendorVerified
                    ? "Receipt partially verified but confidence is low. Queued for manual review."
                    : detectedName
                        ? `Detected "${detectedName}" but expected "${vendorName}". Queued for manual review.`
                        : "Could not detect vendor from receipt. Queued for manual review.",
        });

        response.cookies.getAll().forEach((cookie) => {
            jsonResponse.cookies.set(cookie.name, cookie.value);
        });
        return jsonResponse;
    } catch (err) {
        console.error("[receipt-verify] Error:", err);
        return NextResponse.json({ error: "Receipt processing failed" }, { status: 500 });
    }
}
