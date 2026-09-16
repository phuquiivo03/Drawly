"use client";

import { SlotExpand } from "@/features/slot/slot.schema";
import { User } from "lucide-react";
import Image from "next/image";

type Props = {
  participant: SlotExpand;
  index: number;
};

const rarityStyles = [
  {
    border: "border-b-4 border-b-indigo-500",
    rarity: "text-indigo-400",
  },
  {
    border: "border-b-4 border-b-amber-400",
    rarity: "text-amber-400",
  },
  {
    border: "border-b-4 border-b-fuchsia-500",
    rarity: "text-fuchsia-400",
  },
  {
    border: "border-b-4 border-b-sky-400",
    rarity: "text-sky-400",
  },
  {
    border: "border-b-4 border-b-zinc-500",
    rarity: "text-zinc-400",
  },
] as const;

export default function ReelCard({ participant, index }: Props) {
  const style = rarityStyles[Math.floor(Math.random() * 4)];
  if (!participant) return;
  return (
    <div
      className={`
        relative
        h-[190px]
        w-[180px]
        shrink-0
        overflow-hidden
        rounded-[4px]
        border
         border-ink/10 bg-white p-3 shadow-sm
        ${style.border}
      `}
    >
      {/* ===================================================
          GLOW
      ==================================================== */}
      <div className="absolute top-3 right-3">
        {participant && participant.profile?.avatar_url ? (
          <Image
            width={100}
            height={100}
            alt="avatar"
            className={`size-4 rounded-full w-5 h-5 ${style.border} border-[1px]!`}
            src={participant.profile.avatar_url}
          />
        ) : (
          <User />
        )}
      </div>
      <div
        className={`
          pointer-events-none
          absolute
          inset-0
        `}
      />

      {/* ===================================================
          IMAGE
      ==================================================== */}

      <div
        className="
          relative
          flex
          h-[138px]
          min-h-0
          items-center
          justify-center
         
        "
      >
        <span className={`min-h-0 font-bold text-4xl  ${style.rarity}`}>
          {participant.slot_number}
        </span>
      </div>
    </div>
  );
}
