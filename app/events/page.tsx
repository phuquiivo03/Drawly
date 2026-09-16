"use client";
import CreateEventForm from "@/components/events/CreateEventForm";
import EventCard from "@/components/events/eventCard";
import { Participants } from "@/components/events/Participants";
import { RewardCard } from "@/components/events/RewardCard";
import DefaultLayout from "@/components/layout/default";
import Reel from "@/components/lucky-reel/page";
import { Button } from "@/components/ui/button";
import { EventWithPrize } from "@/features/event/event.schema";
import { useEffect, useRef, useState } from "react";

const participants = [
  ["AR", "Ava Reynolds"],
  ["JM", "Jordan Miller"],
  ["SK", "Sam Kim"],
  ["MP", "Mia Patel"],
  ["LN", "Leo Nguyen"],
  ["OT", "Olivia Taylor"],
  ["NC", "Noah Chen"],
  ["ES", "Emma Stone"],
  ["WB", "William Brown"],
  ["SH", "Sofia Hernandez"],
];

export default function Events() {
  // @ts-ignore
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [events, setEvents] = useState<EventWithPrize[]>();
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
      });
  }, []);

  return (
    <DefaultLayout>
      {openForm && <CreateEventForm setOpen={setOpenForm} />}
      <div className="w-full flex justify-center ">
        <div className="max-w-6xl w-full mt-10 rounded-[28px] border border-white/80 bg-white/60 p-5 shadow-2xl shadow-sky-200/45 backdrop-blur-2xl sm:p-6">
          <div className="my-2 w-full flex justify-between">
            <span className="text-xl font-bold">My Events</span>
            <Button
              onClick={() => {
                setOpenForm(true);
              }}
              size="lg"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-2xl bg-accent! px-4! py-4 text-base font-bold text-white shadow-xl shadow-accent/30 transition  hover:shadow-2xl"
            >
              <span className="grid size-6 place-items-center rounded-full bg-white/25 text-xl leading-none">
                +
              </span>
              New Event
            </Button>
          </div>
          <div className="flex gap-4">
            {events &&
              events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
