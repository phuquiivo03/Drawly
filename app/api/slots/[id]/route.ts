import slotServices from "@/features/slot/slot.service";
import { requireAuth } from "@/lib/auth";
import { NextRequest } from "next/server";
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    if (!id) throw new Error("Event Id not found");
    const profile = await requireAuth(req);
    if (!profile) throw new Error("Authen is require");
    // check status
    const result = await slotServices.checkAndUpdateSlot(
      id,
      profile.profile?.id as string,
    );
    return Response.json({
      success: true,
      status: 200,
      data: result,
    });
  } catch (e) {
    return Response.json({
      success: false,
      status: 400,
      message:
        JSON.parse(JSON.stringify((e as Error).message)) ||
        "Fail to create event!!",
    });
  }
}
