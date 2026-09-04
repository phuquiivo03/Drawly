"use client";
import FrostedPanels from "@/components/background/panels";
import Header from "@/components/header";
import Reel from "@/components/lucky-reel/page";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/profile/123e4567-e89b-12d3-a456-426614174000").then((data) => {
      console.log("profile response: ", data);
    });
  }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 font-sans text-ink">
      {/* diagonal frosted glass panels */}
      <FrostedPanels />
      <Header />

      {/* MAIN GRID */}
      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-12 items-center gap-6 px-6 pb-8 md:gap-10 md:px-10 md:pt-8">
        {/* LEFT COPY */}
        <div className="col-span-12 md:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            Live reel engine
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-[64px]">
            Spin the reel.
            <br />
            <span className="bg-gradient-to-r from-brand via-indigo-500 to-accent bg-clip-text text-transparent">
              Pick the winner.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 md:text-lg">
            LuckyReel turns any group, giveaway, or raffle into a fair,
            shareable spin. Add names, set a prize, and let the wheel decide —
            transparently.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* NEW EVENT BUTTON */}
            <button className="group inline-flex cursor-pointer items-center gap-2.5 rounded-2xl bg-accent px-7 py-4 text-base font-bold text-white shadow-xl shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-2xl">
              <span className="grid size-6 place-items-center rounded-full bg-white/25 text-xl leading-none">
                +
              </span>
              New Event
            </button>
            <Button click={() => {}}>
              Watch a spin
              <span className="text-brand">→</span>
            </Button>
          </div>

          {/* stats */}
          <div className="mt-10 flex gap-6 sm:gap-10">
            <div>
              <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                12,480
              </p>
              <p className="text-xs text-ink/50 sm:text-sm">draws spun</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                98%
              </p>
              <p className="text-xs text-ink/50 sm:text-sm">
                fairness verified
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                4.9
              </p>
              <p className="text-xs text-ink/50 sm:text-sm">host rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-12 md:col-span-6">
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div className="rounded-[32px] border border-white/70 bg-white/55 p-6 shadow-2xl shadow-sky-200/60 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                    Current event
                  </p>
                  <p className="font-display text-xl font-bold text-ink">
                    Summer Giveaway
                  </p>
                </div>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  LIVE
                </span>
              </div>

              {/* REEL */}
              <div className="relative mx-auto mt-6 grid size-56 place-items-center md:size-64">
                <div className="absolute inset-0 rounded-full border-[10px] border-white/70 shadow-inner" />
                <div className="spin-reel size-52 rounded-full conic-gradient-from-0 md:size-60" />
                <div className="relative grid size-24 place-items-center rounded-full bg-white shadow-lg">
                  <span className="font-display text-2xl font-bold text-brand">
                    12
                  </span>
                </div>
                {/* pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-accent">
                  ▼
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white">
                <div>
                  <p className="text-xs text-white/50">Winner</p>
                  <p className="font-display text-lg font-bold">Ava R.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">Prize</p>
                  <p className="text-sm font-semibold">AirBuds Pro</p>
                </div>
              </div>

              {/* entries */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                      M
                    </div>
                    <span className="text-sm font-medium">Milo T.</span>
                  </div>
                  <span className="text-xs text-ink/40">in</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                      J
                    </div>
                    <span className="text-sm font-medium">June P.</span>
                  </div>
                  <span className="text-xs text-ink/40">in</span>
                </div>
              </div>
            </div>

            {/* floating chip */}
            <div className="absolute -left-4 top-24 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-2xl md:-left-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">
                Next spin
              </p>
              <p className="font-display text-base font-bold text-ink">2:14</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
