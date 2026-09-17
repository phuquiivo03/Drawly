"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetTime: string | number | Date;
}

export default function Countdown({ targetTime }: CountdownProps) {
  const getRemaining = () => {
    const diff = new Date(targetTime).getTime() - Date.now();
    return Math.max(0, diff);
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, "0");

  if (remaining === 0) {
    return <span>00:00:00</span>;
  }

  // >= 1 day
  if (days >= 1) {
    return (
      <span className="font-semibold">
        {days}d {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  }

  // < 1 day
  return (
    <span className="font-semibold text-sm">
      {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}
