import { Event, EventWithPrize } from "@/features/event/event.schema";
import { SlotExpand } from "@/features/slot/slot.schema";
import { create } from "zustand";

interface EventState {
  slots: SlotExpand[];
  setSlots: (slots: SlotExpand[]) => void;
  participants: SlotExpand[];
  setParticipants: (participants: SlotExpand[]) => void;
  event: EventWithPrize | null;
  setEvent: (event: EventWithPrize) => void;
}

export const useEventStore = create<EventState>((set) => ({
  slots: [],
  setSlots: (slots) => {
    set({
      slots,
    });
  },
  participants: [],
  setParticipants: (participants) => {
    set({
      participants,
    });
  },
  event: null,
  setEvent: (event) =>
    set({
      event,
    }),
}));
