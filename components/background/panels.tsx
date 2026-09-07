"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function FrostedPanels() {
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelARef.current || !panelBRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(panelARef.current, {
        x: 45,
        y: 40,
        rotate: 14,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(panelBRef.current, {
        x: -60,
        y: -65,
        rotate: 24,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="">
      <div
        ref={panelARef}
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rotate-10 floatA border border-white/60 bg-white/40 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl"
      />

      <div
        ref={panelBRef}
        className="pointer-events-none absolute -left-52 bottom-[-220px] h-[520px] w-[520px] rotate-20 floatB border border-white/60 bg-sky-100/50 shadow-2xl shadow-indigo-200/40 backdrop-blur-2xl"
      />

      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
    </div>
  );
}

export default FrostedPanels;
