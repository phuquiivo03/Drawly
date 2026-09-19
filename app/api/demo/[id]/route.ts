import { NextRequest } from "next/server";
import { Profile } from "@/features/profile/profile.schema";
import profileService from "@/features/profile/profile.service";
import { AppResponse } from "@/app/api/type";
import { cookies } from "next/headers";
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const profileData = await profileService.findById(id);
    if (!profileData) {
      return Response.json({
        success: false,
        status: 500,
        message: "fail",
      });
    }
    const responseData: AppResponse<Profile> = {
      status: 200,
      success: true,
      data: JSON.parse(JSON.stringify(profileData)),
    };
    const cookieStore = await cookies();
    cookieStore.set("demo", "true");
    cookieStore.set("demoAccount", JSON.stringify(profileData));
    return Response.json(responseData);
  } catch (e) {
    return Response.json({
      success: false,
      status: 500,
      message: (e as Error).message || "Unknow error",
    });
  }
}
