import React, { PropsWithChildren } from "react";

type Props = {
  label: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  id: string;
  type?: "number" | "string" | "datetime-local";
};
const inputClass =
  "w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-sm font-medium text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/20";

function Input(props: PropsWithChildren<Props>) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-1.5  flex items-center gap-1.5   text-xs font-bold uppercase tracking-wide text-ink/50"
      >
        {props.label}
      </label>
      <input
        type={props.type || "string"}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Summer Case Giveaway"
        maxLength={80}
        className={`${inputClass} ${props.className}`}
      />
      {props.children}
      <p className="mt-1.5 text-xs font-semibold text-accent">
        {props.children}
      </p>
    </div>
  );
}

export default Input;
