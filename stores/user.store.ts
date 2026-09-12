import { SocialUser } from "@/features/profile/profile.schema";
import { create } from "zustand";

interface UserState {
  user: SocialUser | null;
  setUser: (user: SocialUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) =>
    set({
      user,
    }),
}));
