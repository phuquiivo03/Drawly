import { createClient } from "@/infrastructure/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return Response.json(error);
  }
  return Response.json({ success: true });
}
