import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { WELCOME_SEQUENCE } from "@/lib/email/welcome-sequence";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = "unknown", firstName, utmSource, utmMedium, utmCampaign } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Upsert subscriber (ignore if already exists)
    const { data: subscriber, error: subError } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: normalizedEmail,
          first_name: firstName || null,
          source,
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
        },
        { onConflict: "email", ignoreDuplicates: true }
      )
      .select("id, subscribed_at")
      .single();

    if (subError && subError.code !== "23505") {
      // 23505 = unique_violation (already subscribed — that's fine)
      console.error("[subscribe] DB error:", subError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // If already subscribed (duplicate), just return success silently
    if (!subscriber) {
      console.log(`[subscribe] Already subscribed: ${normalizedEmail}`);
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    // 2. Schedule the welcome sequence emails
    const now = new Date();
    const queueRows = WELCOME_SEQUENCE.map((step) => {
      const sendAt = new Date(now);
      sendAt.setDate(sendAt.getDate() + step.delayDays);
      // For day 0, send in 30 seconds (near-instant)
      if (step.delayDays === 0) {
        sendAt.setTime(now.getTime() + 30_000);
      }
      return {
        subscriber_id: subscriber.id,
        email_key: step.key,
        send_at: sendAt.toISOString(),
      };
    });

    const { error: queueError } = await supabase
      .from("email_queue")
      .insert(queueRows);

    if (queueError) {
      console.error("[subscribe] Queue error:", queueError);
      // Non-fatal — subscriber is saved, just log
    }

    // 3. Also push to Beehiiv for newsletter list management
    // (Beehiiv handles the public newsletter; Resend handles the drip sequence)
    try {
      const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;
      if (beehiivPubId) {
        const formData = new FormData();
        formData.append("email", normalizedEmail);
        formData.append("publication_id", beehiivPubId);
        formData.append("utm_source", utmSource || source);
        formData.append("utm_medium", utmMedium || "api");
        formData.append("reactivate_existing", "true");
        await fetch("https://embeds.beehiiv.com/subscribe", {
          method: "POST",
          body: formData,
          mode: "no-cors",
        });
      }
    } catch {
      // Beehiiv failure is non-fatal
    }

    console.log(`[subscribe] New subscriber: ${normalizedEmail} | source=${source} | ${queueRows.length} emails queued`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
