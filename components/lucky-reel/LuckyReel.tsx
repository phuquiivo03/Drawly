"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import type { Reward } from "./types";
import Reel from "./Reel";
import { DrawButton } from "../events/DrawButton";
import ResultPopup from "./ResultPopup";

const CARD_WIDTH = 180;
const CARD_GAP = 12;
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP;

const REEL_SIZE = 100;
const WINNER_INDEX = REEL_SIZE - 8;

const SPIN_DURATION = 6.5;

export type ReelItem = Reward & {
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
  const [resultShow, setResultShow] = useState(false);
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
  useEffect(() => {
    if (result == null) return;
    setResultShow(true);
  }, [result]);
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
        x: targetX - Math.floor(Math.random() * 70 * 2 - 70),
        duration: SPIN_DURATION - 0.7,
        ease: "power4.out",
      });
    });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Reel viewportRef={viewportRef} trackRef={trackRef} items={items} />

      {/* =====================================================
          RESULT
      ====================================================== */}

      <div className="flex h-[80px] items-center justify-center"></div>
      <ResultPopup setShowResult={setResultShow} showResult={resultShow} />
      <DrawButton isSpinning={isSpinning} onClick={spin} />
    </div>
  );
}
