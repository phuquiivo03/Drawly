import { Profile } from "@/features/profile/profile.schema";
import profileServices from "@/features/profile/profile.service";
import { createClient } from "@/infrastructure/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function requireAuth() {
  const demoAccountOrNull = await checkAndGetDemoUser();
  if (demoAccountOrNull !== null) {
    return {
      profile: demoAccountOrNull,
      response: null,
    };
  }

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
  const profile = await profileServices.findBySocialId(user.id);

  return {
    profile,
    response: null,
  };
}

export async function checkAndGetDemoUser(): Promise<Profile | null> {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo")?.value === "true";
  const demoAccount =
    JSON.parse(cookieStore.get("demoAccount")?.value || "") || undefined;
  if (isDemo && demoAccount) {
    if (demoAccount) {
      return demoAccount;
    }
  }

  return null;
}
