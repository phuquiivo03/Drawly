import { create } from "zustand";

interface ErrorState {
  error: string | null;
  setError: (error: string | null) => void;
}

export const useerrorStore = create<ErrorState>((set) => ({
  error: null,
  setError: (error) =>
    set({
      error,
    }),
}));
