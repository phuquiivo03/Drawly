import { useEventStore } from "@/stores/events.store";
import LuckyReel from "./LuckyReel";
import LoadingSkeleton from "../ui/loadingSkeleton";
import { Button } from "../ui/button";
import { EventStatus } from "@/features/event/event.schema";
import { useState } from "react";
import SlotPickerPopup from "../events/SlotPickerPopup";
import { useUserStore } from "@/stores/user.store";

export default function Reel({ className }: { className?: string }) {
  const participants = useEventStore((state) => state.participants);
  const event = useEventStore((state) => state.event);
  const profile = useUserStore((state) => state.user);
  const [show, setShow] = useState(false);
  console.log(profile && event?.creator_id && true, profile, event);
  return (
    <main
      className={`page ${className} max-w-full overflow-hidden  flex min-h-0 flex-col justify-center rounded-2xl border border-ink/8 bg-ink/[0.025] p-4 sm:p-5`}
    >
      {show && <SlotPickerPopup show={show} setShow={setShow} />}
      <section className="case-opening">
        {participants && participants.length > 0 ? (
          <LuckyReel participants={participants} />
        ) : (
          <LoadingSkeleton className="min-h-[300px]">
            <span>Waiting for the participants...</span>
          </LoadingSkeleton>
        )}
        {profile && event?.creator_id !== profile.id && (
          <div className="w-full flex justify-center">
            <Button
              disabled={event?.status !== EventStatus.OPEN}
              size="lg"
              variant="default"
              className="bg-brand! "
              onClick={() => {
                setShow(true);
              }}
            >
              Pick your slots
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
