"use client";

import type { Reward } from "./types";

type Props = {
  reward: Reward;
};

const rarityStyles = {
  common: {
    border: "border-b-4 border-b-zinc-500",
    rarity: "text-zinc-400",
  },

  uncommon: {
    border: "border-b-4 border-b-sky-400",
    rarity: "text-sky-400",
  },

  rare: {
    border: "border-b-4 border-b-indigo-500",
    rarity: "text-indigo-400",
  },

  epic: {
    border: "border-b-4 border-b-fuchsia-500",
    rarity: "text-fuchsia-400",
  },

  legendary: {
    border: "border-b-4 border-b-amber-400",
    rarity: "text-amber-400",
  },
} as const;

export default function RewardCard({ reward }: Props) {
  const style = rarityStyles[reward.rarity];

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
          {reward.id}
        </span>
      </div>

      <span
        className="
            truncate text-xs font-bold
          "
      >
        {reward.name}
      </span>
    </div>
  );
}
