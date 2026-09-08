import { Gift } from "lucide-react";

export function RewardCard() {
  return (
    <div className="flex min-h-0 items-center gap-4 rounded-2xl border border-ink/8 bg-white/65 p-3 sm:gap-5 sm:p-4">
      <div className="grid aspect-square h-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm sm:h-24">
        <img
          src={'reelPistolGold'}
          alt="Royal Etch gold pistol reward"
          className="h-full w-full object-contain p-1 mix-blend-multiply"
        />
      </div>

      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand">
          <Gift className="size-3.5" />
          Event reward
        </span>

        <h1 className="mt-1 truncate font-display text-xl font-bold sm:text-2xl">
          Royal Etch
        </h1>

        <p className="mt-1 line-clamp-2 text-sm text-ink/55">
          A limited gold-finish pistol skin from the Summer Case collection.
        </p>
      </div>

      <span className="ml-auto hidden shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex">
        Ready
      </span>
    </div>
  );
}
