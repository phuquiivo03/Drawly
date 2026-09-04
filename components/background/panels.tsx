function FrostedPanels() {
  return (
    <div className="">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rotate-panel floatA border border-white/60 bg-white/40 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl" />
      <div className="pointer-events-none absolute -left-52 bottom-[-220px] h-[520px] w-[520px] rotate-panel-2 floatB border border-white/60 bg-sky-100/50 shadow-2xl shadow-indigo-200/40 backdrop-blur-2xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
    </div>
  );
}

export default FrostedPanels;
