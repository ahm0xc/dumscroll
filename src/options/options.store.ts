import { create } from "zustand";

export type View = "home" | "settings";

interface OptionsStore {
    view: View;
    setView: (view: View) => void;
}

export const useOptionsStore = create<OptionsStore>((set) => ({
    view: "settings",
    setView: (view) => set({ view }),
}));
