/**
 * POST /api/shopping-list/email
 * ─────────────────────────────
 * Sends the procurement bridge shopping list via Resend
 * and subscribes the user to the newsletter (double duty).
 *
 * Body: {
 *   email: string,
 *   vendors: ShoppingListEmailVendor[],
 *   peptides: ShoppingListEmailPeptide[],
 *   cycleDuration: number,
 *   totalPeptides: number,
 * }
 */
import { NextRequest, NextResponse } from "next/server";
import {
    sendEmail,
    shoppingListEmail,
    type ShoppingListEmailVendor,
    type ShoppingListEmailPeptide,
} from "@/lib/email";

// Rate limiter — simple in-memory sliding window (per-IP, 3 emails/10min)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const rateMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const timestamps = rateMap.get(ip) ?? [];
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) return false;
    recent.push(now);
    rateMap.set(ip, recent);
    return true;
}

// Validate email shape
function isValidEmail(email: unknown): email is string {
    if (typeof email !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            "unknown";

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Try again in a few minutes." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const {
            email,
            vendors,
            peptides,
            cycleDuration,
            totalPeptides,
        } = body as {
            email: unknown;
            vendors: ShoppingListEmailVendor[];
            peptides: ShoppingListEmailPeptide[];
            cycleDuration: number;
            totalPeptides: number;
        };

        // ── Validate ──────────────────────────────────────────
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Valid email address required." },
                { status: 400 }
            );
        }

        if (!Array.isArray(vendors) || vendors.length === 0) {
            return NextResponse.json(
                { error: "Shopping list data required." },
                { status: 400 }
            );
        }

        if (!Array.isArray(peptides) || peptides.length === 0) {
            return NextResponse.json(
                { error: "Peptide data required." },
                { status: 400 }
            );
        }

        if (typeof cycleDuration !== "number" || cycleDuration <= 0) {
            return NextResponse.json(
                { error: "Invalid cycle duration." },
                { status: 400 }
            );
        }

        // ── Build & send email ────────────────────────────────
        const template = shoppingListEmail({
            vendors,
            peptides,
            cycleDuration,
            totalPeptides: totalPeptides ?? peptides.length,
        });

        const sent = await sendEmail(email, template);

        if (!sent) {
            console.warn(`[shopping-list-email] Failed to send to ${email}`);
            return NextResponse.json(
                { error: "Email delivery failed. Please try again." },
                { status: 502 }
            );
        }

        // ── Log subscription for future newsletter wire-up ────
        console.log(
            `[SUBSCRIBE] ${email} | source=shopping-list | peptides=${totalPeptides} | ${new Date().toISOString()}`
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[shopping-list-email] Error:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
