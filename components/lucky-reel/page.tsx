import { useEventStore } from "@/stores/events.store";
import LuckyReel from "./LuckyReel";
import LoadingSkeleton from "../ui/loadingSkeleton";

export default function Reel({ className }: { className?: string }) {
  const participants = useEventStore((state) => state.participants);
  return (
    <main
      className={`page ${className} max-w-full overflow-hidden  flex min-h-0 flex-col justify-center rounded-2xl border border-ink/8 bg-ink/[0.025] p-4 sm:p-5`}
    >
      <section className="case-opening">
        {participants && participants.length > 0 ? (
          <LuckyReel participants={participants} />
        ) : (
          <LoadingSkeleton className="min-h-[300px]">
            <span>Loading...</span>
          </LoadingSkeleton>
        )}
      </section>
    </main>
  );
}
