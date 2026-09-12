import {
  CreateEvent,
  createEventRequestSchema,
} from "@/features/event/event.schema";
import { createEvent } from "@/features/event/event.service";
import serviceService from "@/features/prize/prize.service";
import slotServices from "@/features/slot/slot.service";
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
      lock_at: parseResult.data.lock_at,
      server_seed: serverSeed,
      server_seed_hash: hashed,
      creator_id: parseResult.data.creator_id,
    };
    const createResult = await createEvent(eventData);
    if (!createResult) throw new Error("create event fail");

    // create prize
    const createPrizeData = parseResult.data.prizes.map((data) => {
      return { ...data, event_id: createResult.id };
    });
    console.log("Start crete prize");
    const prize = await serviceService.createManyPrizes(createPrizeData);
    if (!prize || prize.length == 0) {
      throw new Error("Fail to create Prizes!");
    }

    // create slots
    const max_slot = parseInt(parseResult.data.max_slot || "50");
    const slots = createSlotsData(max_slot, createResult.id);
    const createdSlots = await slotServices.createManySlots(slots);
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
      message:
        JSON.parse(JSON.stringify((e as Error).message)) ||
        "Fail to create event!!",
    });
  }
}
