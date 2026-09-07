import LuckyReel from "./LuckyReel";
import { Reward } from "./types";

const rewards: Reward[] = [
  {
    id: "1",
    name: "AK-47",
    rarity: "common",
    image: "/rewards/karambit.png",
  },
  {
    id: "2",
    name: "Glock-18",
    rarity: "common",
    image: "/rewards/karambit.png",
  },
  {
    id: "3",
    name: "M4A1-S",
    rarity: "uncommon",
    image: "/rewards/karambit.png",
  },
  {
    id: "4",
    name: "AWP",
    rarity: "rare",
    image: "/rewards/karambit.png",
  },
  {
    id: "5",
    name: "Karambit",
    rarity: "epic",
    image: "/rewards/karambit.png",
  },
  {
    id: "6",
    name: "Dragon Lore",
    rarity: "legendary",
    image: "/rewards/karambit.png",
  },
];

const winner = rewards[5];

export default function Reel({ className }: { className?: string }) {
  return (
    <main className={`page ${className}`}>
      <section className="case-opening">
        <LuckyReel rewards={rewards} winner={winner} />
      </section>
    </main>
  );
}
