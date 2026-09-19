import eventServices from "@/features/event/event.service";
import prizeServices from "@/features/prize/prize.service";
import slotServices from "@/features/slot/slot.service";
import { requireAuth } from "@/lib/auth";

export async function GET(): Promise<Response> {
  try {
    const { profile } = await requireAuth();
    if (!profile) throw new Error("Unauthorized");
    const slots = await slotServices.findManySlotByUser(profile.id);
    if (!slots) throw new Error("No event found");
    const eventIds = slots.map((slot) => slot.event_id);
    const events = await eventServices.findManyByArray(eventIds);
    if (!events) throw new Error("No event found");
    const eventPrizesPromise = Promise.all(
      events?.map((event) => {
        return prizeServices.findByEventId(event.id);
      }),
    );
    const result = await eventPrizesPromise;
    return Response.json({
      success: true,
      status: 200,
      data: result.map((prize, index) => {
        return {
          prizes: prize,
          ...events[index],
        };
      }),
    });
  } catch (e) {
    return Response.json({
      success: false,
      status: 400,
      message: (e as Error).message || "Internal server error",
    });
  }
}
