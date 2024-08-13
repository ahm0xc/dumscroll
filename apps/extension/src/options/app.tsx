import { create } from "zustand";

import { useEffect } from "react";
import Activation from "./activation";
import Settings from "./settings";

export type UI = "settings" | "activation";
export interface UseAppearanceStore {
  ui: UI;
  setUI: (ui: UI) => void;
}

export const useAppearanceStore = create<UseAppearanceStore>((set) => ({
  ui: "settings",
  setUI: (ui) => set({ ui }),
}));

export default function App() {
  const [ui, setUI] = useAppearanceStore((state) => [state.ui, state.setUI]);

  useEffect(() => {
    const initialUI = new URL(window.location.href).searchParams.get("ui");
    if (initialUI) {
      setUI(initialUI as UI);
    }
  }, []);

  return (
    <div className="mt-8 px-4">
      {ui === "settings" && <Settings />}
      {ui === "activation" && <Activation />}
    </div>
  );
}
