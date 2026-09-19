"use client";
import { useEventStore } from "@/stores/events.store";
import { Clock, Gift, Lock, LockOpen } from "lucide-react";
import ImageViewer from "../ui/ImageViewer";
import { Event, EventStatus } from "@/features/event/event.schema";
import { toast } from "react-toastify";
import { AppResponse } from "@/app/api/type";
import { useUserStore } from "@/stores/user.store";
import { RewardCardLoading } from "./RewardCardLoading";
import Countdown from "../ui/countdown";

export function RewardCard() {
  const { event, setEvent } = useEventStore((state) => state);
  const user = useUserStore((state) => state.user);
  if (!event) return <RewardCardLoading />;
  const classes = user
    ? event?.creator_id === user.id && event.status != EventStatus.CLOSE
      ? "group"
      : ""
    : "";
  const handleUpdateEventStatus = (status: EventStatus) => {
    fetch(`/api/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data: AppResponse<Event | null>) => {
        if (data.data) {
          setEvent({ ...event, status: data.data.status });
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        toast.error("Failed to update status");
      });
  };
  return (
    <div className="flex min-h-0 items-center gap-4 rounded-2xl border border-ink/8 bg-white/65 p-3 sm:gap-5 sm:p-4 justify-between">
      <div className="flex gap-4 items-center">
        <div className="grid aspect-square h-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm sm:h-24">
          <ImageViewer
            src={event?.prizes[0]?.images[0] || "/image-break.png"}
          />
        </div>

        <div className="min-w-0 ">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand">
            <Gift className="size-3.5" />
            Event reward
          </span>

          <h1 className="mt-1 truncate font-display text-xl font-bold sm:text-2xl">
            {event?.prizes[0]?.name}
          </h1>

          <p className="mt-1 line-clamp-2 text-sm text-ink/55">
            {event?.prizes[0]?.description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            id="event-status"
            className="ml-auto hidden shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex"
          >
            {event?.status}
          </span>
          <button
            id="update-status-btn"
            disabled={
              !(user != null && event?.creator_id === user.id) ||
              event.status == EventStatus.CLOSE
            }
            className={classes}
            onClick={() => {
              handleUpdateEventStatus(
                event.status == EventStatus.LOCKED
                  ? EventStatus.OPEN
                  : EventStatus.LOCKED,
              );
            }}
          >
            {event?.status == EventStatus.OPEN ? (
              <>
                <Lock
                  size={16}
                  className="lock hidden group-hover:block text-accent "
                />
                <LockOpen
                  size={16}
                  className="text-brand group-hover:hidden shadow-2xs"
                />
              </>
            ) : (
              <>
                <Lock
                  size={16}
                  className="lock group-hover:hidden text-accent"
                />
                <LockOpen
                  size={16}
                  className="hidden group-hover:block  text-brand"
                />
              </>
            )}
          </button>
        </div>
        <div id="remaining-time" className="flex items-center gap-2">
          <Clock size={16} />
          {event.lock_at && <Countdown targetTime={event.lock_at} />}
        </div>
      </div>
    </div>
  );
}
