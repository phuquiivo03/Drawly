"use client";

import { useUserStore } from "@/stores/user.store";
import Image from "next/image";
import { useState } from "react";
import SigninOption from "./ui/signinOptions";
import ProfileMenu from "./ui/profileMenu";
import Link from "next/link";
const pages = [
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "Winners",
    url: "/winners",
  },
];
function Header() {
  const [show, setShow] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  return (
    <div className="">
      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10 md:pt-7">
        <Link href={"/"} className="flex items-center gap-3">
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
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-medium text-ink/70 lg:flex">
          {pages.map((page, index) => (
            <Link key={index} href={page.url}>
              {page.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user && user != null ? (
            <ProfileMenu />
          ) : (
            <>
              <button
                onClick={() => {
                  setShow(true);
                }}
                className="hidden cursor-pointer rounded-full border border-ink/10 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white sm:inline-flex"
              >
                Sign in
              </button>
              <button className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition hover:-translate-y-0.5">
                Launch reel
              </button>
            </>
          )}
        </div>
      </header>
      {show && <SigninOption open={show} setOpen={setShow} />}
    </div>
  );
}

export default Header;
