"use client";

import { useerrorStore } from "@/stores/errors.store";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserStore((state) => state);
  useEffect(() => {
    if (!user)
      fetch("/api/auth/facebook")
        .then((res) => res.json())
        .then((data) => {
          if (data) setUser(data);
          else toast.error("Failed to create profile");
        });
  }, []);

  return <div>{children}</div>;
}
