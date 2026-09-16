import { UserPlus, Users } from "lucide-react";
import { CopyToClipboard } from "../ui/copyToClipboard";
import { useEventStore } from "@/stores/events.store";
import { SlotExpand } from "@/features/slot/slot.schema";
import Image from "next/image";
import LoadingSkeleton from "../ui/loadingSkeleton";

interface ParticipantsProps {
  participants: SlotExpand[];
  winner: string | null;
}

export function Participants({ participants, winner }: ParticipantsProps) {
  const event = useEventStore((state) => state.event);
  return (
    <aside className="flex min-h-0 flex-col max-h-[80vh] rounded-[24px] border border-white/80 bg-white/60 p-4 shadow-2xl shadow-sky-200/45 backdrop-blur-2xl sm:p-5">
      <div className="flex items-start justify-between border-b border-ink/8 pb-4">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <Users className="size-5 text-brand" />
            Participants
          </p>

          <p className="mt-1 text-xs text-ink/45">Everyone in this draw</p>
        </div>

        <div className="">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand">
            10 / 12
          </span>
          <div className="flex gap-2 items-center mt-1">
            <UserPlus className="size-4 text-brand" />
            {event && (
              <CopyToClipboard
                text={`${window.location.origin}/events/${event.id}`}
                className="text-accent hover:opacity-70"
              />
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto py-3 pr-1">
        {participants && participants.length > 0 ? (
          participants.map((item, index) => (
            <div
              key={index}
              className={`flex h-12 items-center gap-3 rounded-xl border px-3 transition ${
                // winner === name
                false
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-ink/8 bg-white/65"
              }`}
            >
              {/* <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
              {initials}
            </span> */}

              <Image
                alt="avatar"
                width={200}
                height={200}
                src={item.profile?.avatar_url || "/image-break.png"}
                className="rounded-full border-[1px] border-brand w-6 h-6"
              />

              <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                {item.profile?.display_name}
              </span>

              <span className="text-xs text-ink/30">{item.slot_number}</span>
            </div>
          ))
        ) : (
          <LoadingSkeleton className="flex flex-col gap-2">
            <div className="h-12 rounded-xl w-full border-ink/8 border "></div>
            <div className="h-12 rounded-xl w-full border-ink/8 border"></div>
            <div className="h-12 rounded-xl w-full border-ink/8 border"></div>
            <div className="h-12 rounded-xl w-full border-ink/8 border"></div>
          </LoadingSkeleton>
        )}
      </div>

      <div className="border-t border-ink/8  pt-3 text-center text-xs font-medium text-ink/40">
        2 spots available
      </div>
    </aside>
  );
}
