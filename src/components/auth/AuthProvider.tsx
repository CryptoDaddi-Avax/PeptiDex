"use client";

/**
 * AuthProvider — wraps the app to provide auth state to all client components.
 * Manages Supabase auth session, user profile, and auth actions.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Profile {
    id: string;
    display_name: string;
    country_code: string | null;
    badge: "contributor" | "verified_buyer" | "lab_confirmed";
    log_count: number;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signInAnonymously: () => Promise<void>;
    signInWithMagicLink: (email: string) => Promise<{ success: boolean; error?: string }>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    const fetchProfile = useCallback(async (userId: string) => {
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (data) {
            setProfile(data as Profile);
        }
    }, [supabase]);

    const refreshProfile = useCallback(async () => {
        if (user?.id) {
            await fetchProfile(user.id);
        }
    }, [user?.id, fetchProfile]);

    useEffect(() => {
        // Get initial session
        supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
            setUser(currentUser);
            if (currentUser) {
                fetchProfile(currentUser.id);
            }
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const newUser = session?.user ?? null;
                setUser(newUser);
                if (newUser) {
                    await fetchProfile(newUser.id);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase, fetchProfile]);

    const signInAnonymously = useCallback(async () => {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "anonymous" }),
        });
        if (res.ok) {
            // Refresh the client-side session
            const { data: { user: newUser } } = await supabase.auth.getUser();
            setUser(newUser);
            if (newUser) await fetchProfile(newUser.id);
        }
    }, [supabase, fetchProfile]);

    const signInWithMagicLink = useCallback(async (email: string) => {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "magic-link", email }),
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, error: data.error };
        }
        return { success: true };
    }, []);

    const signOut = useCallback(async () => {
        await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "sign-out" }),
        });
        setUser(null);
        setProfile(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            user, profile, loading,
            signInAnonymously, signInWithMagicLink, signOut, refreshProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
