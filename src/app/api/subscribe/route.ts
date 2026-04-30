import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, source } = await req.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        // TODO: Wire this up to your preferred email provider:
        // - ConvertKit: POST to https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe
        // - Mailchimp: POST to https://us1.api.mailchimp.com/3.0/lists/{LIST_ID}/members
        // - Buttondown: POST to https://api.buttondown.email/v1/subscribers
        // - Beehiiv: POST to https://api.beehiiv.com/v2/publications/{PUB_ID}/subscriptions
        //
        // For now, log the subscription to server console:
        console.log(`[SUBSCRIBE] ${email} | source=${source} | ${new Date().toISOString()}`);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
