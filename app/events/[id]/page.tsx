"use client";
import { Participants } from "@/components/events/Participants";
import { RewardCard } from "@/components/events/RewardCard";
import SlotPickerPopup from "@/components/events/SlotPickerPopup";
import DefaultLayout from "@/components/layout/default";
import Reel from "@/components/lucky-reel/page";
import { Button } from "@/components/ui/button";
import { SlotExpand } from "@/features/slot/slot.schema";
import { useEventStore } from "@/stores/events.store";
import { useEffect, useRef, useState } from "react";

export default function Page({ id }: { id: string }) {
  const [winner, setWinner] = useState<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const { setEvent, event, setSlots, setParticipants, participants, slots } =
    useEventStore((state) => state);
  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.data);
      });
  }, []);
  // setup usestate
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  useEffect(() => {
    if (event) {
      //get slots
      fetch(`/api/events/${event.id}/slots`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            const participants = data.data.reduce(
              (prev: SlotExpand[], slot: SlotExpand) => {
                return slot.user_id ? [...prev, slot] : prev;
              },
              [],
            );
            const sorted = (data.data as SlotExpand[]).sort((a, b) => {
              return parseInt(a.slot_number) - parseInt(b.slot_number);
            });
            setSlots(sorted);
            setParticipants(participants);
          }
        });
    }
  }, [event]);
  return (
    <DefaultLayout>
      
      
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 pt-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5">
        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 rounded-[24px] border border-white/80 bg-white/55 p-4 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl sm:p-5 lg:p-6">
          <RewardCard />
          <Reel />
        </section>
        <Participants participants={participants} winner={winner || null} />
      </div>
    </DefaultLayout>
  );
}
