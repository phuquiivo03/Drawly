import { appEnv } from "@/lib/env";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    appEnv.infrastructure.supabaseUrl,
    appEnv.infrastructure.supabaseKey,
  );
}
