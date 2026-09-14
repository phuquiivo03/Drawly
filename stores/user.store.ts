import { Profile, SocialUser } from "@/features/profile/profile.schema";
import { create } from "zustand";

interface UserState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) =>
    set({
      user,
    }),
}));
