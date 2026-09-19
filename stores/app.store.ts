import { create } from "zustand";

interface AppStore {
  showLogin: boolean;
  setShowLogin: (val: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showLogin: false,
  setShowLogin: (val: boolean) =>
    set({
      showLogin: val,
    }),
}));
