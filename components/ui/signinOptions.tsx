import { X } from "lucide-react";
import FacebookLogin from "./facebookLogin";
type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};
function SigninOption(props: Props) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
      <button
        onClick={() => props.setOpen(false)}
        className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink/40 transition hover:bg-ink/5 hover:text-ink"
        aria-label="Close result"
      >
        <X className="size-4" />
      </button>
      <div className="p-12 rounded-2xl flex flex-col bg-white gap-6">
        <span className="text-xl font-bold  block">Sign in</span>
        <div className="">
          <FacebookLogin />
        </div>
      </div>
    </div>
  );
}

export default SigninOption;
