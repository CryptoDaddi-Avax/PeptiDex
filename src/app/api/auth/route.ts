/**
 * Auth API — handles sign-in (magic link), sign-out, and anonymous sessions.
 *
 * POST /api/auth { action: "magic-link", email: "..." }
 * POST /api/auth { action: "sign-out" }
 * POST /api/auth { action: "anonymous" }
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createRouteClient(request: NextRequest) {
    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    return { supabase, response };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action } = body;

        if (action === "magic-link") {
            const { email } = body;
            if (!email || !email.includes("@")) {
                return NextResponse.json({ error: "Valid email required" }, { status: 400 });
            }

            const { supabase, response } = createRouteClient(request);
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
                },
            });

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            // Copy cookies to our JSON response
            const jsonResponse = NextResponse.json({ success: true, message: "Check your email for the login link." });
            response.cookies.getAll().forEach((cookie) => {
                jsonResponse.cookies.set(cookie.name, cookie.value);
            });
            return jsonResponse;
        }

        if (action === "anonymous") {
            const { supabase, response } = createRouteClient(request);
            const { data, error } = await supabase.auth.signInAnonymously();

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            const jsonResponse = NextResponse.json({
                success: true,
                user_id: data.user?.id,
                display_name: "Researcher-" + (data.user?.id?.substring(0, 6) || "anon"),
            });
            response.cookies.getAll().forEach((cookie) => {
                jsonResponse.cookies.set(cookie.name, cookie.value);
            });
            return jsonResponse;
        }

        if (action === "sign-out") {
            const { supabase, response } = createRouteClient(request);
            await supabase.auth.signOut();

            const jsonResponse = NextResponse.json({ success: true });
            response.cookies.getAll().forEach((cookie) => {
                jsonResponse.cookies.set(cookie.name, cookie.value);
            });
            return jsonResponse;
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
