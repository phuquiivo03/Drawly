import { Users } from "lucide-react";

interface ParticipantsProps {
  participants: string[][];
  winner: string | null;
}

export function Participants({ participants, winner }: ParticipantsProps) {
  return (
    <aside className="flex min-h-0 flex-col rounded-[24px] border border-white/80 bg-white/60 p-4 shadow-2xl shadow-sky-200/45 backdrop-blur-2xl sm:p-5">
      <div className="flex items-start justify-between border-b border-ink/8 pb-4">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <Users className="size-5 text-brand" />
            Participants
          </p>

          <p className="mt-1 text-xs text-ink/45">Everyone in this draw</p>
        </div>

        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand">
          10 / 12
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto py-3 pr-1">
        {participants.map(([initials, name], index) => (
          <div
            key={name}
            className={`flex h-12 items-center gap-3 rounded-xl border px-3 transition ${
              winner === name
                ? "border-emerald-300 bg-emerald-50"
                : "border-ink/8 bg-white/65"
            }`}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
              {initials}
            </span>

            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {name}
            </span>

            <span className="text-xs text-ink/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/8 pt-3 text-center text-xs font-medium text-ink/40">
        2 spots available
      </div>
    </aside>
  );
}
