import { settings } from "~/config";
import useGlobalStorage from "~/hooks/use-globalstorage";
import SwitchCard from "./_components/switch-card";

export default function ProductivitySettings() {
  const { value: isProductivityModeEnabled, set: setIsProductivityModeEnabled } =
    useGlobalStorage<boolean>(settings["productivity-mode"].default, {
      key: settings["productivity-mode"].key,
    });

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      <SwitchCard
        checked={isProductivityModeEnabled}
        onCheckedChange={setIsProductivityModeEnabled}
        title="Enable Productivity mode"
        description="Removes all kind of distractions with one click."
      />
    </div>
  );
}
