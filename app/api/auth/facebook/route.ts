import { CreateProfile, SocialUser } from "@/features/profile/profile.schema";
import profileServices from "@/features/profile/profile.service";
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
    // check and create data
    const profile = await profileServices.findBySocialId(
      (user as SocialUser).id,
    );
    if (!profile) {
      const profileCreateData: CreateProfile = {
        display_name: user.user_metadata.nickname,
        avatar_url: user.user_metadata.avatar_url,
        email: user.user_metadata.email,
        social_ref_id: user.id,
      };

      const profileCreateResult =
        await profileServices.create(profileCreateData);
      if (!profileCreateResult) throw new Error("Failed to create new profile");
      return Response.json(profile);
    }
    return Response.json(profile);
  } catch (e) {
    return Response.json({
      success: false,
      status: 500,
      message: (e as Error).message || "Unknow error",
    });
  }
}
