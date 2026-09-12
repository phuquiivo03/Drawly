import { ImagePlus } from "lucide-react";
import { RefObject } from "react";

type Props = {
  fileInputRef: RefObject<HTMLInputElement | null>;
};
function UploadImageButton(props: Props) {
  return (
    <button
      type="button"
      onClick={() => props.fileInputRef.current?.click()}
      className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-ink/15 bg-white/50 text-ink/40 transition hover:border-brand hover:text-brand"
    >
      <span className="flex flex-col items-center gap-1 text-xs font-semibold">
        <ImagePlus className="size-5" />
        Add image
      </span>
    </button>
  );
}

export default UploadImageButton;
