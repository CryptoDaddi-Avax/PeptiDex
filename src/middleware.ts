/**
 * Supabase SSR middleware — refreshes auth session on every request.
 * Required for @supabase/ssr to work with Next.js server components.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isGonePath } from "@/lib/gone-paths";

export async function middleware(request: NextRequest) {
    // Removed pages: answer 410 Gone before any auth work.
    if (isGonePath(request.nextUrl.pathname)) {
        return new NextResponse("410 Gone", {
            status: 410,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-Robots-Tag": "noindex, nofollow",
                "Cache-Control": "public, max-age=3600",
            },
        });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh the session — this is required for server components
    // to have access to the current user.
    await supabase.auth.getUser();

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, images, etc.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
    ],
};
