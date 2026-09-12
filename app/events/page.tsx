"use client";
import CreateEventForm from "@/components/events/CreateEventForm";
import { Participants } from "@/components/events/Participants";
import { RewardCard } from "@/components/events/RewardCard";
import DefaultLayout from "@/components/layout/default";
import Reel from "@/components/lucky-reel/page";
import { useEffect, useRef, useState } from "react";

const participants = [
  ["AR", "Ava Reynolds"],
  ["JM", "Jordan Miller"],
  ["SK", "Sam Kim"],
  ["MP", "Mia Patel"],
  ["LN", "Leo Nguyen"],
  ["OT", "Olivia Taylor"],
  ["NC", "Noah Chen"],
  ["ES", "Emma Stone"],
  ["WB", "William Brown"],
  ["SH", "Sofia Hernandez"],
];

export default function Events() {
  // @ts-ignore
  const [winner, setWinner] = useState<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <DefaultLayout>
      <CreateEventForm />
    </DefaultLayout>
  );
}
