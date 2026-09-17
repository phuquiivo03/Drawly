import {
  CreateEvent,
  createEventRequestSchema,
} from "@/features/event/event.schema";
import eventServices, { createEvent } from "@/features/event/event.service";
import serviceService from "@/features/prize/prize.service";
import slotServices from "@/features/slot/slot.service";
import { requireAuth } from "@/lib/auth";
import { generateServerSeed, hash } from "@/lib/crypto.helper";
import { createSlotsData } from "@/lib/helper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { profile } = await requireAuth();
    if (!profile) throw new Error("Unauthorized");
    const parseResult = createEventRequestSchema.safeParse(body);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    // generate seed -> hash
    const serverSeed = generateServerSeed();
    const hashed = hash(serverSeed);
    const eventData: CreateEvent = {
      lock_at: parseResult.data.lock_at,
      server_seed: serverSeed,
      server_seed_hash: hashed,
      creator_id: profile.id,
      slots_per_user: parseResult.data.slots_per_user,
    };
    const createResult = await createEvent(eventData);
    if (!createResult) throw new Error("create event fail");

    // create prize
    const createPrizeData = parseResult.data.prizes.map((data) => {
      return { ...data, event_id: createResult.id };
    });
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
    } else {
      throw new Error("Fail to create Sltos!");
    }
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

export async function GET(): Promise<Response> {
  try {
    const { profile } = await requireAuth();
    if (!profile) throw new Error("Unauthorized");
    const winners = await eventServices.findManyUserEvents(profile?.id);
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
