import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "./theme-provider";

const themes = ["system", "light", "dark"] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function switchTheme() {
    const index = themes.indexOf(theme);
    setTheme(themes[(index + 1) % themes.length]);
  }

  const iconMap = {
    system: MonitorIcon,
    light: SunIcon,
    dark: MoonIcon,
  };

  const Icon = iconMap[theme];

  return (
    <button
      type="button"
      onClick={switchTheme}
    >
      <Icon className="size-4" />
    </button>
  );
}
