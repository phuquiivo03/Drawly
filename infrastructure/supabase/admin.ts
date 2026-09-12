import { appEnv } from "@/lib/env";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  appEnv.infrastructure.supabaseUrl,
  appEnv.infrastructure.supabaseServiceRoleKey!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
