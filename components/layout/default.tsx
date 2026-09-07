import { PropsWithChildren } from "react";
import Header from "../header";

function DefaultLayout(props: PropsWithChildren) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 font-sans text-ink">
      {/* diagonal frosted glass panels */}
      <Header /> {props.children}
    </div>
  );
}

export default DefaultLayout;
