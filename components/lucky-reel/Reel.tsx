import { Ref } from "react";
import { ReelItem } from "./LuckyReel";
import RewardCard from "./RewardCard";

type Props = {
  viewportRef: Ref<HTMLDivElement>;
  trackRef: Ref<HTMLDivElement>;
  items: ReelItem[];
};
function Reel(props: Props) {
  const { viewportRef, trackRef, items } = props;
  return (
    <div
      className="
              relative h-[230px] w-full overflow-hidden border-y   border-10 border-white/70 shadow-inner rounded-sm 
            "
    >
      <div className=" pointer-events-none absolute inset-y-0 left-0 z-10 w-[6px] bg-gradient-to-r  from-black/10    to-transparent" />

      <div className=" pointer-events-none absolute inset-y-0 right-0 z-10 w-[6px] bg-gradient-to-l from-white/70   to-transparent" />

      <div
        ref={viewportRef}
        className="
                h-full
                w-full
                overflow-hidden
              "
      >
        <div
          ref={trackRef}
          className="
                  flex
                  h-full
                  w-max
                  items-center
                  gap-3
                  will-change-transform
                "
        >
          {items.map((item) => (
            <RewardCard key={item.reelId} reward={item} />
          ))}
        </div>
      </div>

      {/* ===================================================
                CENTER INDICATOR
            ==================================================== */}

      <div className=" pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[2px] -translate-x-1/2">
        {/* Vertical line */}

        <div className=" absolute inset-y-0 left-0 w-[2px] bg-[#f5b400] shadow-[0_0_12px_rgba(245,180,0,0.6)]" />

        {/* Top arrow */}

        <div
          className=" absolute left-1/2 top-0 h-[14px] w-[14px] -translate-x-1/2 rotate-45 bg-[#f5b400] shadow-[0_0_15px_rgba(245,180,0,0.5)]
                "
        />
      </div>
    </div>
  );
}

export default Reel;
