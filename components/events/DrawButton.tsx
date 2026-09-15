import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEventStore } from "@/stores/events.store";
import { EventStatus } from "@/features/event/event.schema";

interface DrawButtonProps {
  isSpinning: boolean;
  onClick: () => void;
}

export function DrawButton({ isSpinning, onClick }: DrawButtonProps) {
  const event = useEventStore((state) => state.event);
  if (!event) return;
  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        disabled={isSpinning || event.status != EventStatus.LOCKED}
        size="lg"
        className="h-12 min-w-52 rounded-xl bg-accent! px-8 text-base font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
      >
        {isSpinning ? (
          <Sparkles className="animate-pulse" />
        ) : (
          <Play className="fill-current" />
        )}

        {isSpinning ? "Spinning…" : "Start draw"}
      </Button>
    </div>
  );
}
