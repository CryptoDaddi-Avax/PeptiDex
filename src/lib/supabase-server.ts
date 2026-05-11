/**
 * Supabase server client — for use in API routes, server components,
 * and server actions ONLY. Uses the SERVICE_ROLE key which bypasses
 * Row Level Security. Never import this from client components.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

let serverClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createServerClient() {
    if (serverClient) return serverClient;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        throw new Error(
            "[supabase-server] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
            "This client can only be used server-side."
        );
    }

    serverClient = createSupabaseClient(url, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    return serverClient;
}
