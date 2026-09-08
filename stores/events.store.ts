import { Event, EventWithPrize } from "@/features/event/event.schema";
import { create } from "zustand";

interface EventState {
  event: EventWithPrize | null;
  setEvent: (event: EventWithPrize) => void;
}

export const useEventStore = create<EventState>((set) => ({
  event: null,
  setEvent: (event) =>
    set({
      event,
    }),
}));
