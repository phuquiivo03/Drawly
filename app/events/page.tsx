"use client";
import CreateEventForm from "@/components/events/CreateEventForm";
import EventCard from "@/components/events/eventCard";
import { Participants } from "@/components/events/Participants";
import { RewardCard } from "@/components/events/RewardCard";
import DefaultLayout from "@/components/layout/default";
import Reel from "@/components/lucky-reel/page";
import { Button } from "@/components/ui/button";
import { Event, EventWithPrize } from "@/features/event/event.schema";
import { fetcher } from "@/lib/helper";
import { useAppStore } from "@/stores/app.store";
import { useUserStore } from "@/stores/user.store";
import { useEffect, useRef, useState } from "react";

export default function Events() {
  // @ts-ignore
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [events, setEvents] = useState<EventWithPrize[]>();
  const { user } = useUserStore();
  const { setShowLogin } = useAppStore();
  const [participated, setParticipated] = useState<EventWithPrize[]>();
  useEffect(() => {
    fetcher<EventWithPrize[]>("/api/events").then((data) => {
      if (data.data) setEvents(data.data);
    });
    fetcher<EventWithPrize[]>("/api/events/participated").then((data) => {
      if (data.data) {
        setParticipated(data.data);
      }
    });
  }, []);

  return (
    <DefaultLayout>
      {openForm && <CreateEventForm setOpen={setOpenForm} />}
      <div className="w-full flex justify-center ">
        <div className="space-y-4 max-w-6xl w-full mt-10 rounded-[28px] border border-white/80 bg-white/60 p-5 shadow-2xl shadow-sky-200/45 backdrop-blur-2xl sm:p-6">
          <div className=" w-full flex justify-between">
            <span className="text-xl font-bold">My Events</span>
            <Button
              onClick={() => {
                if (user == null) setShowLogin(true);
                else setOpenForm(true);
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
          <div className="grid grid-cols-5 gap-4">
            {events &&
              events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
          </div>
          <div className="">
            <span className="text-xl font-bold">Participated</span>
            <div className="grid grid-cols-5 gap-4 flex-wrap justify-center mt-4">
              {participated &&
                participated.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
