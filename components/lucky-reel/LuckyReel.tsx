"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Reel from "./Reel";
import { DrawButton } from "../events/DrawButton";
import ResultPopup from "./ResultPopup";
import { ShortSlot, SlotExpand } from "@/features/slot/slot.schema";
import { useEventStore } from "@/stores/events.store";
import { toast } from "react-toastify";
import { EventStatus } from "@/features/event/event.schema";
const REEL_SIZE = 100;
const WINNER_INDEX = REEL_SIZE - 8;
const CARD_WIDTH = 180;
const CARD_GAP = 12;
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP;

const SPIN_DURATION = 6.5;

type Props = {
  participants: SlotExpand[];
};

export default function LuckyReel({ participants }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { event, setEvent, setWinner, winner } = useEventStore(
    (state) => state,
  );
  const [reel, setReel] = useState<SlotExpand[]>(participants);
  const [items, setItems] = useState<SlotExpand[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [result, setResult] = useState<SlotExpand | null>(null);

  const createReel = useCallback(() => {
    // Winner được inject vào vị trí cố định.
    const reel: SlotExpand[] = Array.from({ length: REEL_SIZE }, (_, index) => {
      const reward =
        participants[Math.floor(Math.random() * participants.length)];

      return reward;
    });

    return reel;
  }, [participants]);

  useEffect(() => {
    setItems(createReel());
  }, [createReel]);
  useEffect(() => {
    if (result == null) return;
    setResultShow(true);
  }, [result]);
  const spin = async () => {
    if (isSpinning || !viewportRef.current || !trackRef.current || !event) {
      return;
    }

    setIsSpinning(true);
    setResult(null);

    try {
      // 1. Get winner FIRST
      const res = await fetch(`/api/events/result/${event.id}`);

      if (!res.ok) {
        throw new Error("Failed to get event result");
      }

      const data = await res.json();

      const winnerSlot = data.data as SlotExpand;

      if (!winnerSlot) {
        throw new Error("Winner slot not defined");
      }

      // 2. Save winner
      setWinner(winnerSlot);

      // 3. Create reel
      const newReel = createReel();

      // 4. Inject winner at fixed position
      newReel[WINNER_INDEX] = winnerSlot;

      // 5. Render reel
      setItems(newReel);

      // 6. Wait for React to render the new items
      requestAnimationFrame(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!viewport || !track) {
          setIsSpinning(false);
          return;
        }

        gsap.killTweensOf(track);

        gsap.set(track, {
          x: 0,
        });

        const viewportWidth = viewport.offsetWidth;

        const winnerCenter = WINNER_INDEX * ITEM_WIDTH + CARD_WIDTH / 2;

        const targetX = viewportWidth / 2 - winnerCenter;

        gsap.to(track, {
          x: targetX,
          duration: SPIN_DURATION,
          ease: "power4.out",

          onComplete: () => {
            setIsSpinning(false);
            setResult(winnerSlot);
          },
        });
      });
      // set event status
      setEvent({ ...event, status: EventStatus.CLOSE });
    } catch (error) {
      console.error(error);

      setIsSpinning(false);
      toast.error("Failed to get event result");
    }
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
