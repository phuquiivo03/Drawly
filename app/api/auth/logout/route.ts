import { createClient } from "@/infrastructure/supabase/server";
import { cookies } from "next/headers";

export async function POST() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  cookieStore.delete("demo");
  cookieStore.delete("demoAccount");
  const { error } = await supabase.auth.signOut();
  if (error) {
    return Response.json(error);
  }
  return Response.json({ success: true });
}
