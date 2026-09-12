import { Trash2 } from "lucide-react";

type Props = {
  url: string;
  name: string;
  removeImage: (index: number) => void;
  index: number;
};
function UploadedImage(props: Props) {
  return (
    <div
      key={props.url}
      className="group relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-white"
    >
      <img
        src={props.url}
        alt={props.name}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => props.removeImage(props.index)}
        aria-label={`Remove ${props.name}`}
        className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition group-hover:opacity-100"
      >
        <Trash2 className="size-3" />
      </button>
    </div>
  );
}

export default UploadedImage;
