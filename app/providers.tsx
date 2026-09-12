"use client";

import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserStore((state) => state);

  useEffect(() => {
    if (!user)
      fetch("/api/auth/facebook")
        .then((res) => res.json())
        .then((data) => {
          fetch("/api/auth/facebook")
            .then((res) => res.json())
            .then((data) => {
              setUser(data);
            });
        });
  }, []);

  return <div>{children}</div>;
}
