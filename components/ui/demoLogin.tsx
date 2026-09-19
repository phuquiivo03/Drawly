"use client";

import { Button } from "./button";
import { useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { Profile } from "@/features/profile/profile.schema";
import { AppResponse } from "@/app/api/type";
import { useUserStore } from "@/stores/user.store";

const demoAccounts = [
  {
    id: "6d7e1a08-e4df-44f8-a5ca-bf928cf96b93",
    name: "Leonardo DicapriKng",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "anhbacoder",
  },
  {
    id: "b17f9efe-cb0f-49ce-829f-2f38a1ff102a",
    name: "Bùi Minh Hiếu",
  },
  {
    id: "b8e9f56e-142d-429a-ae02-370f6f2b3732",
    name: "Mi Vin",
  },
];

export default function DemoLogin() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore((s) => s);
  const handleLoginDemoAccount = async (id: string) => {
    setLoading(true);
    fetch(`/api/demo/${id}`)
      .then((res) => res.json())
      .then((data: AppResponse<Profile>) => {
        if (data.data) {
          setUser(data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      className="bg-accent! text-white! relative group"
      variant="secondary"
    >
      Login with Demo account
      {loading ? <LoaderCircle className="animate-spin" /> : <ChevronDown />}
      <div className="absolute top-[100%] left-0 hidden group-hover:block shadow-2xl p-4 rounded-md space-y-2 bg-white">
        {demoAccounts.map((account, index) => (
          <div
            onClick={() => {
              handleLoginDemoAccount(account.id);
            }}
            className="px-6 py-2 rounded-md hover:bg-accent text-black hover:text-white cursor-pointer border"
          >
            <span>{account.name}</span>
          </div>
        ))}
      </div>
    </Button>
  );
}
