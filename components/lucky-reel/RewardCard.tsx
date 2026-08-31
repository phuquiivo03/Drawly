"use client";

import type { Reward } from "./types";

type Props = {
  reward: Reward;
};

const rarityStyles = {
  common: {
    border: "border-b-2 border-b-zinc-500",
    rarity: "text-zinc-400",
    glow: "",
  },

  uncommon: {
    border: "border-b-2 border-b-sky-400",
    rarity: "text-sky-400",
    glow: "bg-[radial-gradient(circle_at_50%_100%,rgba(76,166,255,0.15),transparent_60%)]",
  },

  rare: {
    border: "border-b-2 border-b-indigo-500",
    rarity: "text-indigo-400",
    glow: "bg-[radial-gradient(circle_at_50%_100%,rgba(105,92,255,0.18),transparent_60%)]",
  },

  epic: {
    border: "border-b-2 border-b-fuchsia-500",
    rarity: "text-fuchsia-400",
    glow: "bg-[radial-gradient(circle_at_50%_100%,rgba(199,76,255,0.18),transparent_60%)]",
  },

  legendary: {
    border: "border-b-2 border-b-amber-400",
    rarity: "text-amber-400",
    glow: "bg-[radial-gradient(circle_at_50%_100%,rgba(255,174,0,0.25),transparent_60%)]",
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
        border-white/[0.07]
        bg-gradient-to-b
        from-[#181a20]
        to-[#101116]
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
          ${style.glow}
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
          bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)]
          p-[18px]
        "
      >
        <img
          src={reward.image}
          alt={reward.name}
          draggable={false}
          className="
            h-full
            w-full
            select-none
            object-contain
            drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]
          "
        />
      </div>

      {/* ===================================================
          INFO
      ==================================================== */}

      <div
        className="
          flex
          h-[52px]
          flex-col
          justify-center
          bg-black/30
          px-[10px]
          py-[7px]
        "
      >
        <span
          className={`
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.12em]
            opacity-70
            ${style.rarity}
          `}
        >
          {reward.rarity}
        </span>

        <span
          className="
            mt-[3px]
            truncate
            text-xs
            font-bold
            text-white
          "
        >
          {reward.name}
        </span>
      </div>
    </div>
  );
}
