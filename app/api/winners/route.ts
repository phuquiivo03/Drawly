import { createWinnerSchema } from "@/features/winner/winner.schema";
import winnerServices from "@/features/winner/winner.service";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const winners = await winnerServices.findMany(1, 10);
    if (!winners) throw new Error("Failed to get winners");
    return Response.json({
      success: true,
      status: 200,
      data: winners,
    });
  } catch (e) {
    return Response.json({
      success: false,
      status: 400,
      message: (e as Error).message || "Internal server error",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createWinnerSchema.safeParse(body);
    if (parseResult.error) throw new Error(parseResult.error.message);
    const createWinner = await winnerServices.create(parseResult.data);

    if (!createWinner) throw new Error("Failed to create winner");
    return Response.json({
      success: true,
      status: 200,
      data: createWinner,
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
