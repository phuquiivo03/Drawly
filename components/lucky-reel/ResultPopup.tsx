"use client";
import confetti from "canvas-confetti";
import { Button } from "../ui/button";
import { PartyPopper, Trophy, X } from "lucide-react";
import { useEffect } from "react";
type Props = {
  showResult: boolean;
  setShowResult: (val: boolean) => void;
};
const fireworkBursts = [
  { left: "12%", top: "18%", color: "#f43f5e", delay: "0s" },
  { left: "85%", top: "15%", color: "#0ea5e9", delay: "0.25s" },
  { left: "22%", top: "70%", color: "#facc15", delay: "0.5s" },
  { left: "78%", top: "68%", color: "#a78bfa", delay: "0.7s" },
  { left: "50%", top: "8%", color: "#34d399", delay: "0.4s" },
];

function FireworkBurst({
  left,
  top,
  color,
  delay,
}: {
  left: string;
  top: string;
  color: string;
  delay: string;
}) {
  return (
    <div
      className="firework-burst pointer-events-none absolute"
      style={{ left, top, animationDelay: delay }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="firework-spark"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
            transform: `rotate(${i * 30}deg) translateY(0)`,
          }}
        />
      ))}
      <span className="firework-flash" style={{ backgroundColor: color }} />
    </div>
  );
}
var count = 200;
var defaults = {
  origin: { y: 0.7, x: 0.4 },
};

function ResultPopup(props: Props) {
  const { showResult, setShowResult } = props;
  const handleCelebrate = (
    particleRatio: number,
    opts: {
      spread: number;
      startVelocity?: number;
      decay?: number;
      scalar?: number;
    },
  ) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };
  useEffect(() => {
    if (showResult) {
      handleCelebrate(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      handleCelebrate(0.2, {
        spread: 60,
      });
      handleCelebrate(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      handleCelebrate(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      handleCelebrate(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [showResult]);
  return (
    <div className="">
      {showResult && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Winner announcement"
        >
          {fireworkBursts.map((burst, index) => (
            <FireworkBurst key={index} {...burst} />
          ))}
          <div className="result-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-8 text-center shadow-2xl shadow-brand/30">
            <button
              onClick={() => setShowResult(false)}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink/40 transition hover:bg-ink/5 hover:text-ink"
              aria-label="Close result"
            >
              <X className="size-4" />
            </button>
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-chart-4 to-accent text-white shadow-lg shadow-accent/30">
              <Trophy className="size-9" />
            </div>
            <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
              <PartyPopper className="size-4" /> Congratulations!
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">
              {"winner.user_id"}
            </h2>
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-4 text-left shadow-sm">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-chart-4/15 to-accent/10">
                <img
                  src={"/golden-pistol.png"}
                  alt="Royal Etch gold pistol reward"
                  className="h-full w-full object-contain p-1 mix-blend-multiply"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase text-ink/40">
                  Won the reward
                </p>
                <p className="truncate font-display text-lg font-bold text-ink">
                  Royal Etch
                </p>
                <p className="text-xs text-ink/50">
                  Summer Case · Limited gold finish
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-ink/10"
                onClick={() => setShowResult(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultPopup;
