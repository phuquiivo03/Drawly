"use client";
import DefaultLayout from "@/components/layout/default";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    fetch("/api/winners")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return <DefaultLayout></DefaultLayout>;
}

export default Page;
