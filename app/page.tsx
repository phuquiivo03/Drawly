"use client";
import FrostedPanels from "@/components/background/panels";
import HomeHero from "@/components/home/hero";
import DefaultLayout from "@/components/layout/default";
import Image from "next/image";
import { useEffect } from "react";
enum Rarities {
  cyan = "reel-rare-cyan",
  red = "reel-rare-red",
  violet = "reel-rare-violet",
  gold = "reel-rare-gold",
}
const textColors: Record<Rarities, string> = {
  [Rarities.cyan]: "text-brand",
  [Rarities.red]: "text-accent",
  [Rarities.violet]: "text-chart-5",
  [Rarities.gold]: "text-chart-4",
};

const borders: Record<Rarities, string> = {
  [Rarities.cyan]: "border-brand",
  [Rarities.red]: "border-accent",
  [Rarities.violet]: "border-chart-5",
  [Rarities.gold]: "border-chart-4",
};
const reelItems = [
  {
    avatar: "/av1.png",
    slot_number: "3",
    name: "Neon Circuit",
    type: "Rifle",
    image: "/golden-pistol.png",
    rarity: Rarities.cyan,
  },
  {
    avatar: "/av3.png",
    slot_number: "5",
    name: "Dragon Fang",
    type: "Shotgun",
    image: "/golden-pistol.png",
    rarity: Rarities.red,
  },
  {
    avatar: "/av1.png",
    slot_number: "2",
    name: "Royal Etch",
    type: "Pistol",
    image: "/golden-pistol.png",
    rarity: Rarities.gold,
  },
  {
    avatar: "/av3.png",
    slot_number: "1",
    name: "Ultraviolet",
    type: "SMG",
    image: "/golden-pistol.png",
    rarity: Rarities.violet,
  },
  {
    avatar: "/av2.png",
    slot_number: "7",
    name: "Neon Circuit",
    type: "Rifle",
    image: "/golden-pistol.png",
    rarity: Rarities.cyan,
  },
  {
    avatar: "/av3.png",
    slot_number: "21",
    name: "Dragon Fang",
    type: "Shotgun",
    image: "/golden-pistol.png",
    rarity: Rarities.red,
  },
  {
    avatar: "/av1.png",
    slot_number: "14",
    name: "Dragon Fang",
    type: "Shotgun",
    image: "/golden-pistol.png",
    rarity: Rarities.red,
  },
];
export default function Home() {
  useEffect(() => {
    // fetch("/api/profile/123e4567-e89b-12d3-a456-426614174000").then((data) => {
    //   console.log("profile response: ", data);
    // });
  }, []);
  return (
    <DefaultLayout>
      <FrostedPanels />

      {/* MAIN GRID */}
      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-12 items-center gap-6 px-6 pb-8 md:gap-10 md:px-10 md:pt-8">
        {/* LEFT COPY */}
        <HomeHero />
        {/* RIGHT PANEL */}
        <div className="col-span-12 md:col-span-6">
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-2xl shadow-sky-200/60 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                    Live drop
                  </p>
                  <p className="font-display text-xl font-bold text-ink">
                    Summer Case
                  </p>
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  12 ENTRIES
                </span>
              </div>

              {/* CS2-style horizontal reel */}
              <div className="reel-window relative mt-6 h-48 overflow-hidden border-y border-ink/10 bg-ink/[0.035]">
                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-accent shadow-[0_0_12px_var(--color-accent)]">
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 border-x-[7px] border-t-[9px] border-x-transparent border-t-accent" />
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-accent" />
                </div>
                <div className="case-reel-track flex h-full w-max items-stretch gap-2 py-3">
                  {reelItems.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className={`relative flex w-36 shrink-0 flex-col justify-center overflow-hidden border border-ink/10 bg-white/80 p-2.5 shadow-sm items-center ${item.rarity}`}
                    >
                      <Image
                        width={100}
                        height={100}
                        alt="avatar"
                        className={`absolute top-3 right-3 size-4 rounded-full w-5 h-5 ${borders[item.rarity]} border-[1px]!`}
                        src={item.avatar}
                      />
                      <span
                        className={` text-2xl text-center font-bold w-full object-contain mix-blend-multiply  ${textColors[item.rarity]}`}
                      >
                        {item.slot_number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white">
                <div>
                  <p className="text-xs text-white/50">Winning item</p>
                  <p className="font-display text-lg font-bold">Neon Circuit</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">Winner</p>
                  <p className="text-sm font-semibold">Ava R.</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-ink/45">
                <span>Provably fair draw</span>
                <span className="font-semibold text-brand">Round #2,481</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
