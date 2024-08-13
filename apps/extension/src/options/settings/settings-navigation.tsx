import { motion } from "framer-motion";
import { create } from "zustand";

export type UI = "uses-tracking" | "schedule" | "productivity" | "reminders";

type UseSettingsNavigation = {
  ui: UI;
  setUI: (ui: UI) => void;
};

export const useSettingsNavigation = create<UseSettingsNavigation>((set) => ({
  ui: "uses-tracking",
  setUI: (ui) => set({ ui }),
}));

interface NavigationItemType {
  label: string;
  ui: UI;
}

export default function SettingsNavigation() {
  const [currentUIState, setCurrentUIState] = useSettingsNavigation((state) => [
    state.ui,
    state.setUI,
  ]);

  const navigationItems: NavigationItemType[] = [
    {
      label: "Uses tracking",
      ui: "uses-tracking",
    },
    {
      label: "Schedule",
      ui: "schedule",
    },
    {
      label: "Productivity",
      ui: "productivity",
    },
    {
      label: "Reminders",
      ui: "reminders",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {navigationItems.map((item) => {
        return (
          <NavigationItem
            currentUIState={currentUIState}
            setCurrentUIState={setCurrentUIState}
            item={item}
            key={`settings-page-navigation-item${item.ui}`}
          />
        );
      })}
    </div>
  );
}

function NavigationItem({
  item,
  currentUIState,
  setCurrentUIState,
}: {
  item: NavigationItemType;
  currentUIState: UI;
  setCurrentUIState: (ui: UI) => void;
}) {
  return (
    <button
      type="button"
      className="relative h-9 w-fit px-4 flex items-center text-sm rounded-md"
      onClick={() => setCurrentUIState(item.ui)}
    >
      {currentUIState === item.ui && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] bg-neutral-200 -z-10"
          layoutId="settings-page-navigation-background"
        />
      )}
      <p>{item.label}</p>
    </button>
  );
}
