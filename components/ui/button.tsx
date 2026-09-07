import { PropsWithChildren } from "react";

type Props = {
  click: () => void;
};
function Button(props: PropsWithChildren<Props>) {
  return (
    <button className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-ink/10 bg-white/70 px-6 py-4 text-base font-semibold text-ink backdrop-blur transition hover:bg-white">
      {props.children}
    </button>
  );
}

export default Button;
