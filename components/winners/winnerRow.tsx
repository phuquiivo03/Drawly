import { SlotExpand } from "@/features/slot/slot.schema";
import Image from "next/image";

type Props = {
  winner: SlotExpand;
};
function WinnerRow(props: Props) {
  const winner = props.winner;
  return (
    <li
      key={winner.id}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/8 bg-white/70 p-3 transition hover:border-brand/30 hover:bg-white"
    >
      <Image
        alt="avatar"
        width={100}
        height={100}
        className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand"
        src={winner.profile?.avatar_url || "/break-image.png"}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {winner.profile?.display_name}
        </p>
        <p className="truncate text-xs text-ink/45">
          Lucky number: {winner.slot_number}
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="grid size-11 place-items-center overflow-hidden rounded-lg border border-ink/10 bg-white">
          <img
            src={winner.profile?.avatar_url}
            alt=""
            className="h-full w-full object-contain p-1 mix-blend-multiply"
          />
        </div>
        <span className="text-sm font-semibold">{winner.slot_number}</span>
      </div>
    </li>
  );
}

export default WinnerRow;
