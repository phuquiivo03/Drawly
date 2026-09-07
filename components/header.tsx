function Header() {
  return (
    <div className="">
      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10 md:pt-7">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/30">
            <span className="font-display text-lg font-bold">L</span>
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold tracking-tight">
              LuckyReel
            </p>
            <p className="text-xs font-medium text-ink/50">
              Spin the draw, share the win
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-9 text-sm font-medium text-ink/70 lg:flex">
          <span className="cursor-default">Events</span>
          <span className="cursor-default">Reel</span>
          <span className="cursor-default">Winners</span>
          <span className="cursor-default">Pricing</span>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden cursor-pointer rounded-full border border-ink/10 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white sm:inline-flex">
            Sign in
          </button>
          <button className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition hover:-translate-y-0.5">
            Launch reel
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
