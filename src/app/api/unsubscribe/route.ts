import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed: true })
    .eq("email", email.toLowerCase().trim());

  // Redirect to a simple confirmation page
  return NextResponse.redirect(new URL("/unsubscribed", req.url));
}
