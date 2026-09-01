import {
  CreateEvent,
  createEventRequestSchema,
  createEventSchema,
} from "@/features/event/event.schema";
import { createEvent } from "@/features/event/event.service";
import { createManySlots } from "@/features/slot/slot.service";
import { generateServerSeed, hash } from "@/lib/crypto.helper";
import { createSlotsData } from "@/lib/helper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createEventRequestSchema.safeParse(body);
    if (parseResult.error) throw new Error(parseResult.error.message);
    // generate seed -> hash
    const serverSeed = generateServerSeed();
    const hashed = hash(serverSeed);
    const eventData: CreateEvent = {
      server_seed: serverSeed,
      server_seed_hash: hashed,
      creator_id: parseResult.data.creator_id,
    };
    const createResult = await createEvent(eventData);
    if (!createResult) throw new Error("create event fail");
    // create slots
    const max_slot = parseInt(parseResult.data.max_slot || "50");
    const slots = createSlotsData(max_slot, createResult.id);
    const createdSlots = await createManySlots(slots);
    if (createdSlots) {
      return Response.json({
        success: true,
        status: 200,
        data: createResult,
      });
    }
  } catch (e) {
    console.log("===============ERROR============");
    console.error(e);
    return Response.json({
      success: false,
      status: 401,
      message: (e as Error).message || "Fail to create event!!",
    });
  }
}
