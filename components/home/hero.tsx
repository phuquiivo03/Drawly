import Button from "../ui/button";
import Stat from "./stat";
import StatusBadge from "./statusBadge";

const stats = [
  {
    value: "12,480",
    unit: "draws spun",
  },
  {
    value: "98%",
    unit: "fairness verified",
  },
  {
    value: "4.9",
    unit: "host rating",
  },
];

function HomeHero() {
  return (
    <div className="col-span-12 md:col-span-6">
      <StatusBadge />
      <h1 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-[64px]">
        Spin the reel.
        <br />
        <span className="bg-gradient-to-r from-brand via-indigo-500 to-accent bg-clip-text text-transparent">
          Pick the winner.
        </span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 md:text-lg">
        LuckyReel turns any group, giveaway, or raffle into a fair, shareable
        spin. Add names, set a prize, and let the wheel decide — transparently.
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
        {stats.map((stat) => (
          <Stat value={stat.value} unit={stat.unit} />
        ))}
      </div>
    </div>
  );
}

export default HomeHero;
