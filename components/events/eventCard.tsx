import { EventWithPrize } from "@/features/event/event.schema";
import Image from "next/image";
import Link from "next/link";

type Props = {
  event: EventWithPrize;
};
function EventCard({ event }: Props) {
  const prize = event.prizes[0];
  return (
    <div className="w-[200px]  shadow-2xl! hover:shadow-blue-300 transition-all ease-in duration-150 rounded-2xl p-2">
      {event ? (
        <Link href={`/events/${event.id}`} className="cursor-pointer">
          <Image
            width={100}
            height={100}
            className="h-[130px] rounded-t-2xl w-full"
            alt={prize.images[0]}
            src={prize.images[0]}
          />
          <div className="p-2 flex justify-between">
            <div className=" flex flex-col">
              <span className="font-bold text-md text-brand">{prize.name}</span>
              <span className="font-semibold">{prize.description}</span>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span className="ml-auto hidden shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex">
                {event?.status}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EventCard;
