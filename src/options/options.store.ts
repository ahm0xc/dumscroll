import { create } from "zustand";

export type View = "home" | "settings";

type OptionsStore = {
  view: View;
  setView: (view: View) => void;
};

export const useOptionsStore = create<OptionsStore>(set => ({
  view: "settings",
  setView: view => set({ view }),
}));
