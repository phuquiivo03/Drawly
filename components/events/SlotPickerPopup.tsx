import { X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
};

function SlotPickerPopup({ show, setShow }: Props) {
  const ls = [];
  for (let i = 1; i < 50; i++) {
    ls.push(i);
  }

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
        <div className="grid w-fit grid-cols-8 gap-2 mt-6">
          {ls.map((item, index) => {
            return (
              <Button key={index} variant="default">
                {item}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SlotPickerPopup;
