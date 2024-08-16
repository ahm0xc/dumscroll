import { motion } from "framer-motion";
import { ChartSplineIcon, KeySquareIcon, type LucideIcon, Settings2Icon } from "lucide-react";
import { type UI, useAppearanceStore } from "./app";

export default function Sidebar() {
  return (
    <div className="w-full h-full">
      <div className="mt-8 mx-4">
        <div className="space-y-2">
          <SidebarItem title="Settings" ui="settings" icon={Settings2Icon} />
          <SidebarItem title="Analytics" ui="analytics" icon={ChartSplineIcon} />
          <SidebarItem title="Activation" ui="activation" icon={KeySquareIcon} />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  title,
  ui,
  icon: Icon,
}: {
  title: string;
  ui: UI;
  icon: LucideIcon;
}) {
  const [appearanceUI, setAppearanceUI] = useAppearanceStore((state) => [state.ui, state.setUI]);

  return (
    <button
      type="button"
      className="w-full h-10 rounded-lg flex items-center px-4 font-medium relative transition-colors duration-200 gap-1.5"
      onClick={() => setAppearanceUI(ui)}
    >
      {appearanceUI === ui && (
        <motion.span
          className="inset-0 rounded-[inherit] bg-neutral-200 absolute -z-10"
          layoutId="sidebar-item-background"
        />
      )}
      <Icon size={16} /> <p>{title}</p>
    </button>
  );
}
