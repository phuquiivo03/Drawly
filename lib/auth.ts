import { createClient } from "@/infrastructure/supabase/server";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 403 }),
    };
  }

  return {
    user,
    response: null,
  };
}
