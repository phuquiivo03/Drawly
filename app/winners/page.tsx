"use client";
import DefaultLayout from "@/components/layout/default";
import { Winner } from "@/features/winner/winner.schema";
import { useEffect, useState } from "react";
import { AppResponse } from "../api/type";
import LoadingSkeleton from "@/components/ui/loadingSkeleton";
import { Search } from "lucide-react";
import Input from "@/components/ui/input";
import { Profile } from "@/features/profile/profile.schema";
import { Prize } from "@/features/prize/prize.schema";
import Image from "next/image";
import { useDebounce } from "@/lib/hooks";

function Page() {
  const [winners, setWinners] = useState<Winner[]>();
  const [filtered, setFiltered] = useState<Winner[]>();

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1000);
  useEffect(() => {
    fetch("/api/winners")
      .then((res) => res.json())
      .then((data: AppResponse<Winner[] | null>) => {
        if (data.data) {
          setWinners(data.data);
          setFiltered(data.data);
        }
      });
  }, []);
  useEffect(() => {
    const filteredData = winners?.filter(
      (winner) =>
        (winner.prize as Prize).name
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase()) ||
        (winner.user as Profile).display_name
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase()),
    );
    setFiltered(filteredData);
  }, [debouncedQuery]);
  return (
    <DefaultLayout>
      {" "}
      <div className="w-full flex justify-center ">
        <div className="max-w-6xl w-full mt-10 rounded-[28px] border border-white/80 bg-white/60 p-5 shadow-2xl shadow-sky-200/45 backdrop-blur-2xl sm:p-6">
          <div className="flex flex-col gap-3 border-b border-ink/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">All winners</h2>
              <div className="text-xs text-ink/45">
                {winners ? (
                  `${winners.length} results `
                ) : (
                  <LoadingSkeleton>...</LoadingSkeleton>
                )}
              </div>
            </div>
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
              <Input
                id="search"
                label=""
                value={query}
                onChange={setQuery}
                placeholder="Search name, reward or event"
                aria-label="Search winners"
                className="rounded-xl border-ink/10 bg-white/80 pl-9"
              />
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {filtered ? (
              filtered.map((winner) => (
                <li
                  key={winner.id}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/8 bg-white/70 p-3 transition hover:border-brand/30 hover:bg-white"
                >
                  <Image
                    alt="avatar"
                    src={(winner.user as Profile).avatar_url}
                    width={100}
                    height={100}
                    className="size-10 shrink-0 place-items-center rounded-full border border-brand border-[1px]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {(winner.user as Profile).display_name}
                    </p>
                    <p className="truncate text-xs text-ink/45">
                      {`${new Date(winner.created_at).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-11 place-items-center overflow-hidden rounded-lg border border-ink/10 bg-white">
                      <img
                        src={
                          (winner.prize as Prize).images[0] ||
                          "/break-image.png"
                        }
                        alt={(winner.prize as Prize).name}
                        className="h-full w-full object-contain p-1 mix-blend-multiply"
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {(winner.prize as Prize).name}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <LoadingSkeleton>Loading...</LoadingSkeleton>
            )}
            {winners && winners.length === 0 && (
              <li className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink/45">
                No winners match “{query}”.
              </li>
            )}
          </ul>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Page;
