import { create } from "zustand";

interface PageStore {
  page: string | "/";
  setCurrentPage: (page: string) => void;
}

export const usePageStore = create<PageStore>((set) => ({
  page: "/",
  setCurrentPage: (page) => {
    set({
      page,
    });
  },
}));
