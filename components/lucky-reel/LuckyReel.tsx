"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import RewardCard from "./RewardCard";
import type { Reward } from "./types";

const CARD_WIDTH = 180;
const CARD_GAP = 12;
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP;

const REEL_SIZE = 100;
const WINNER_INDEX = REEL_SIZE - 8;

const SPIN_DURATION = 6.5;

type ReelItem = Reward & {
  reelId: string;
};

type Props = {
  rewards: Reward[];
  winner: Reward;
};

export default function LuckyReel({ rewards, winner }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<ReelItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Reward | null>(null);

  const createReel = useCallback(() => {
    const reel: ReelItem[] = Array.from({ length: REEL_SIZE }, (_, index) => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];

      return {
        ...reward,
        reelId: `${reward.id}-${index}`,
      };
    });

    // Winner được inject vào vị trí cố định.
    // Trong production winner nên đến từ backend.
    reel[WINNER_INDEX] = {
      ...winner,
      reelId: `${winner.id}-winner`,
    };

    return reel;
  }, [rewards, winner]);

  useEffect(() => {
    setItems(createReel());
  }, [createReel]);

  const spin = () => {
    if (isSpinning || !viewportRef.current || !trackRef.current) {
      return;
    }

    setIsSpinning(true);
    setResult(null);

    const reel = createReel();

    setItems(reel);

    requestAnimationFrame(() => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) return;

      gsap.killTweensOf(track);

      gsap.set(track, {
        x: 0,
      });

      const viewportWidth = viewport.offsetWidth;

      /*
       * Center của winner trong track.
       */
      const winnerCenter = WINNER_INDEX * ITEM_WIDTH + CARD_WIDTH / 2;

      /*
       * Đưa center của winner vào center viewport.
       */
      const targetX = viewportWidth / 2 - winnerCenter;

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsSpinning(false);
          setResult(winner);
        },
      });

      /*
       * Main spin
       *
       * Chạy nhanh → giảm tốc mạnh.
       */
      timeline.to(track, {
        x: targetX - 70,
        duration: SPIN_DURATION - 0.7,
        ease: "power4.out",
      });

      /*
       * Overshoot nhẹ.
       */
      timeline.to(track, {
        x: targetX + 12,
        duration: 0.4,
        ease: "power2.out",
      });

      /*
       * Settle về winner.
       */
      timeline.to(track, {
        x: targetX,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* =====================================================
          REEL
      ====================================================== */}

      <div
        className="
          relative
          h-[230px]
          w-full
          overflow-hidden
          border-y
          border-white/[0.08]
          bg-gradient-to-b
          from-white/[0.025]
          to-transparent
        "
      >
        {/* ===================================================
            LEFT FADE
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-[180px]
            bg-gradient-to-r
            from-[#08090c]
            via-[#08090c]/90
            to-transparent
          "
        />

        {/* ===================================================
            RIGHT FADE
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-10
            w-[180px]
            bg-gradient-to-l
            from-[#08090c]
            via-[#08090c]/90
            to-transparent
          "
        />

        {/* ===================================================
            VIEWPORT
        ==================================================== */}

        <div
          ref={viewportRef}
          className="
            h-full
            w-full
            overflow-hidden
          "
        >
          <div
            ref={trackRef}
            className="
              flex
              h-full
              w-max
              items-center
              gap-3
              will-change-transform
            "
          >
            {items.map((item) => (
              <RewardCard key={item.reelId} reward={item} />
            ))}
          </div>
        </div>

        {/* ===================================================
            CENTER INDICATOR
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-1/2
            z-20
            w-[2px]
            -translate-x-1/2
          "
        >
          {/* Vertical line */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              w-[2px]
              bg-[#f5b400]
              shadow-[0_0_12px_rgba(245,180,0,0.6)]
            "
          />

          {/* Top arrow */}

          <div
            className="
              absolute
              left-1/2
              top-0
              h-[14px]
              w-[14px]
              -translate-x-1/2
              rotate-45
              bg-[#f5b400]
              shadow-[0_0_15px_rgba(245,180,0,0.5)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          RESULT
      ====================================================== */}

      <div className="flex h-[80px] items-center justify-center">
        {result && (
          <div
            className="
              flex
              animate-[resultIn_350ms_ease-out]
              flex-col
              items-center
            "
          >
            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.25em]
                text-zinc-500
              "
            >
              You Won
            </span>

            <span
              className="
                mt-1
                text-xl
                font-black
                text-[#f5b400]
                drop-shadow-[0_0_20px_rgba(245,180,0,0.4)]
              "
            >
              {result.name}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          BUTTON
      ====================================================== */}

      <button
        type="button"
        disabled={isSpinning}
        onClick={spin}
        className="
          mt-6
          min-w-[220px]
          rounded-sm
          bg-[#f5b400]
          px-8
          py-4
          text-[13px]
          font-black
          tracking-[0.08em]
          text-black
          transition-all
          duration-150
          hover:brightness-110
          hover:-translate-y-px
          active:translate-y-px
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSpinning ? "OPENING..." : "OPEN CASE"}
      </button>
    </div>
  );
}
