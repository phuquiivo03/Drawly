import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};
function LoadingSkeleton({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className={` animate-pulse bg-[#0b173006] rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export default LoadingSkeleton;
