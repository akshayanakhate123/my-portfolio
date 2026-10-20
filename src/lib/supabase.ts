import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let _client: SupabaseClient | null = null;
try {
  if (url && key) _client = createBrowserClient(url, key);
} catch {
  _client = null;
}

export const supabase: SupabaseClient | null = _client;
