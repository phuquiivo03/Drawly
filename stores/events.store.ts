import { Event, EventWithPrize } from "@/features/event/event.schema";
import { Slot } from "@/features/slot/slot.schema";
import { create } from "zustand";

interface EventState {
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  participants: Slot[];
  setParticipants: (participants: Slot[]) => void;
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
