import { Slot, SlotExpand } from "@/features/slot/slot.schema";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useEventStore } from "@/stores/events.store";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/user.store";
import { AppResponse } from "@/app/api/type";

type Props = {
  item: Slot;
};
function SlotItem({ item }: Props) {
  const [loading, setLoading] = useState(false);
  const { slots, setSlots, setParticipants } = useEventStore((state) => state);
  const profile = useUserStore((state) => state.user);
  const handleClick = (slotId: string) => {
    setLoading(true);
    fetch(`/api/slots/${slotId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data: AppResponse<SlotExpand>) => {
        if (data.data == undefined) throw new Error("");
        const newSlots = slots.map((slot) =>
          slot.id != (data.data as Slot).id ? slot : data.data,
        );
        setSlots(newSlots as SlotExpand[]);
        const participants = (newSlots as SlotExpand[]).reduce(
          (prev: SlotExpand[], slot: SlotExpand) => {
            return slot.user_id ? [...prev, slot] : prev;
          },
          [],
        );
        setParticipants(participants);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };
  return (
    <Button
      style={
        item.user_id == profile?.id
          ? {
              background: "#78ffbb"!,
              color: "#007a55"!,
            }
          : {}
      }
      onClick={() => {
        handleClick(item.id);
      }}
      disabled={!!item.user_id}
      variant="default"
    >
      {!loading ? (
        item.slot_number
      ) : (
        <Loader2 className="size-4 animate-spin" />
      )}
    </Button>
  );
}

export default SlotItem;
