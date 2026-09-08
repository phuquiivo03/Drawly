"use client";
import { Participants } from "@/components/events/Participants";
import { RewardCard } from "@/components/events/RewardCard";
import DefaultLayout from "@/components/layout/default";
import Reel from "@/components/lucky-reel/page";
import { useEffect, useRef, useState } from "react";

const participants = [
  ["AR", "Ava Reynolds"],
  ["JM", "Jordan Miller"],
  ["SK", "Sam Kim"],
  ["MP", "Mia Patel"],
  ["LN", "Leo Nguyen"],
  ["OT", "Olivia Taylor"],
  ["NC", "Noah Chen"],
  ["ES", "Emma Stone"],
  ["WB", "William Brown"],
  ["SH", "Sofia Hernandez"],
];

export default function Events() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const startDraw = () => {
    if (isSpinning) return;
    setWinner(undefined);
    setIsSpinning(true);
    timeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      setWinner("Ava Reynolds");
    }, 3200);
  };
  return (
    <DefaultLayout>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 pt-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5">
        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 rounded-[24px] border border-white/80 bg-white/55 p-4 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl sm:p-5 lg:p-6">
          <RewardCard />
          <Reel />
        </section>
        <Participants participants={participants} winner={winner || null} />
      </div>
    </DefaultLayout>
  );
}
