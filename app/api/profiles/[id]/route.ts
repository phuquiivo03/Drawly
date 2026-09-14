import { NextRequest } from "next/server";
import {
  createProfileSchema,
  Profile,
} from "@/features/profile/profile.schema";
import { AppResponse } from "../../type";
import profileService from "@/features/profile/profile.service";
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
    return Response.json(responseData);
  } catch (e) {
    return Response.json({
      success: false,
      status: 500,
      message: (e as Error).message || "Unknow error",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createProfileSchema.safeParse(body);
    if (parseResult.error) throw new Error(parseResult.error.message);
    const result = await profileService.create(parseResult.data);
    return Response.json({
      success: true,
      status: 201,
      data: result,
    });
  } catch (e) {
    return Response.json({
      success: false,
      status: 401,
      message:
        JSON.parse(JSON.stringify((e as Error).message)) ||
        "Fail to create event!!",
    });
  }
}
