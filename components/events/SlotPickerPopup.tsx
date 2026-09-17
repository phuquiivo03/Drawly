import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEventStore } from "@/stores/events.store";
import { AppResponse } from "@/app/api/type";
import { Slot, SlotExpand } from "@/features/slot/slot.schema";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SlotItem from "./SlotItem";
import { useUserStore } from "@/stores/user.store";

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
};

function SlotPickerPopup({ show, setShow }: Props) {
  const { slots, setSlots } = useEventStore((state) => state);
  const user = useUserStore((s) => s.user);
  const { event, participants } = useEventStore((state) => state);
  const [slotRemaining, setSlotRemaining] = useState(0);
  useEffect(() => {
    const usedSlots = participants.reduce((prev: number, curr: SlotExpand) => {
      return curr.user_id == user?.id ? prev + 1 : prev;
    }, 0);
    setSlotRemaining((event?.slots_per_user as number) - usedSlots);
  }, [participants]);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Winner announcement"
    >
      <div className="result-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-8 text-center shadow-2xl shadow-brand/30">
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-md text-ink/40 transition hover:bg-ink/5 hover:text-ink"
          aria-label="Close result"
        >
          <X className="size-4" />
        </button>
        <div className="flex justify-between mt-4">
          <span className="text-left ">
            Your remaining slots:{" "}
            <span
              className={slotRemaining > 0 ? "text-[#007a55]" : "text-accent"}
            >
              {slotRemaining}
            </span>
          </span>
        </div>
        <div className="grid w-fit grid-cols-8 gap-2 mt-4">
          {slots.map((item, index) => {
            return (
              <SlotItem disable={slotRemaining == 0} item={item} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SlotPickerPopup;
