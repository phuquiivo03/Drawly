import { CreateSlot, ShortSlot, Slot } from "@/features/slot/slot.schema";

export const createSlotsData = (max: number, eventId: string): CreateSlot[] => {
  const result = [];
  for (let i = 0; i < max; i++) {
    const slot: CreateSlot = {
      event_id: eventId,
      slot_number: i + 1,
      user_id: null,
    };
    result.push(slot);
  }
  return result;
};

export function createParticipantsPayload(slots: ShortSlot[]) {
  return slots.map((slot) => `${slot.slot_number}:${slot.user_id}`).join("|");
}

