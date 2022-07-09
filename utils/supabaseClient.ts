import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY;

export const supabase: SupabaseClient = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);
