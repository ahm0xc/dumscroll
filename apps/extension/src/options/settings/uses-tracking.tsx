import { settings } from "~/config";
import useGlobalStorage from "~/hooks/use-globalstorage";
import SwitchCard from "./_components/switch-card";

export default function UsesTrackingSettings() {
  const { value: isUsesTrackingEnabled, set: setIsUsesTrackingEnabled } = useGlobalStorage<boolean>(
    settings["uses-tracking"].default,
    {
      key: settings["uses-tracking"].key,
    },
  );

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      <SwitchCard
        checked={isUsesTrackingEnabled}
        onCheckedChange={setIsUsesTrackingEnabled}
        title="Enable Time tracking"
        description="Monitors time spent on websites and social media."
      />
    </div>
  );
}
