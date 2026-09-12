import { createClient } from "@/infrastructure/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({
        success: false,
        status: 500,
        message: "Profile not found",
      });
    }
    return Response.json(user);
  } catch (e) {
    return Response.json({
      success: false,
      status: 500,
      message: (e as Error).message || "Unknow error",
    });
  }
}
