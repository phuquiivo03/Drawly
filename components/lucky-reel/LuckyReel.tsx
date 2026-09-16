"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { flushSync } from "react-dom";
import Reel from "./Reel";
import { DrawButton } from "../events/DrawButton";
import ResultPopup from "./ResultPopup";
import { SlotExpand } from "@/features/slot/slot.schema";
import { useEventStore } from "@/stores/events.store";
import { toast } from "react-toastify";
import { EventStatus } from "@/features/event/event.schema";
import { useUserStore } from "@/stores/user.store";
import SlotPickerPopup from "../events/SlotPickerPopup";
import { Button } from "../ui/button";
const REEL_SIZE = 100;
const WINNER_INDEX = REEL_SIZE - 8;
const CARD_WIDTH = 180;
const CARD_GAP = 12;

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
  const profile = useUserStore((state) => state.user);
  const [reel, setReel] = useState<SlotExpand[]>(participants);
  const [items, setItems] = useState<SlotExpand[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [result, setResult] = useState<SlotExpand | null>(null);
  const [show, setShow] = useState(false);
  const hasInitializedRef = useRef(false);
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
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    setItems(createReel());
  }, [createReel]);
  useEffect(() => {
    if (result == null) return;
    setResultShow(true);
  }, [result]);

  const pendingWinnerRef = useRef<SlotExpand | null>(null);

  const spin = async () => {
    if (isSpinning || !viewportRef.current || !trackRef.current || !event)
      return;

    setIsSpinning(true);
    setResult(null);

    try {
      const res = await fetch(`/api/events/result/${event.id}`);
      if (!res.ok) throw new Error("Failed to get event result");

      const data = await res.json();
      const winnerSlot = data.data as SlotExpand;
      if (!winnerSlot) throw new Error("Winner slot not defined");

      setWinner(winnerSlot);

      const newReel = createReel();
      newReel[WINNER_INDEX] = winnerSlot;

      // Stash the winner and let the effect below do the animation
      // once React has actually committed `items` to the DOM.
      pendingWinnerRef.current = winnerSlot;
      console.log("winner slot", winnerSlot, "new reel to set", newReel);
      setItems(newReel);

      setEvent({ ...event, status: EventStatus.CLOSE });
    } catch (error) {
      console.error(error);
      setIsSpinning(false);
      toast.error("Failed to get event result");
    }
  };

  useLayoutEffect(() => {
    console.log("start reel with", items);
    const winnerSlot = pendingWinnerRef.current;
    if (!winnerSlot) return; // not a spin-triggered update (e.g. initial mount)

    pendingWinnerRef.current = null;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      setIsSpinning(false);
      return;
    }

    const winnerEl = track.children[WINNER_INDEX] as HTMLElement | undefined;
    if (!winnerEl) {
      setIsSpinning(false);
      return;
    }

    gsap.killTweensOf(track);
    gsap.set(track, { x: 0 });

    const viewportWidth = viewport.offsetWidth;
    const winnerCenter = winnerEl.offsetLeft + winnerEl.offsetWidth / 2;
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
  }, [items]);

  return (
    <div className="flex w-full flex-col items-center">
      {}
      {show && <SlotPickerPopup show={show} setShow={setShow} />}
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[300px] w-full">
            <span className="text-2xl">Loading...</span>
          </div>
        }
      >
        <Reel viewportRef={viewportRef} trackRef={trackRef} items={items} />
      </Suspense>

      {/* =====================================================
          RESULT
      ====================================================== */}

      <div className="flex h-[80px] items-center justify-center"></div>
      <ResultPopup setShowResult={setResultShow} showResult={resultShow} />
      {profile?.id === event?.creator_id ? (
        <DrawButton isSpinning={isSpinning} onClick={spin} />
      ) : (
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
      )}
    </div>
  );
}
