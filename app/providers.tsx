"use client";

import { useerrorStore } from "@/stores/errors.store";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AppResponse } from "./api/type";
import { Profile } from "@/features/profile/profile.schema";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserStore((state) => state);
  useEffect(() => {
    if (!user)
      fetch("/api/auth/facebook")
        .then((res) => res.json())
        .then((data: AppResponse<Profile>) => {
          if (data.data) setUser(data.data);
          else toast.error("Failed to create profile");
        });
  }, []);

  return <div>{children}</div>;
}
