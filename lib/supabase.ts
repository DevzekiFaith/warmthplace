import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configurations for Warmthplace Art Studio
 *
 * For client components and public data fetching:
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 *
 * For secure server actions and admin background jobs:
 * Uses SUPABASE_SERVICE_ROLE_KEY.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Browser / Client-safe Supabase client (respects Row Level Security)
 */
export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Supabase client features will run in mock mode."
      );
    }
  }
  return createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder-anon-key");
}

/**
 * Server / Admin Supabase client (bypasses RLS with Service Role Key)
 * Only use in Server Actions, Route Handlers, or Admin jobs.
 */
export function getSupabaseServerClient() {
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase] SUPABASE_SERVICE_ROLE_KEY is not set. Service operations will be limited."
      );
    }
  }
  return createClient(supabaseUrl || "https://placeholder.supabase.co", key || "placeholder-service-key", {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Convenience default client instance
 */
export const supabase = getSupabaseBrowserClient();
