import { settings } from "~/config";
import useGlobalStorage from "~/hooks/use-globalstorage";
import SwitchCard from "./_components/switch-card";

export default function RemindersSettings() {
  const { value: isTakeABreakEnabled, set: setIsTakeABreakEnabled } = useGlobalStorage<boolean>(
    settings["take-a-break"].default,
    {
      key: settings["take-a-break"].key,
    },
  );
  const { value: isBedTimeReminderEnabled, set: setIsBedTimeReminderEnabled } =
    useGlobalStorage<boolean>(settings["bed-time-reminder"].default, {
      key: settings["bed-time-reminder"].key,
    });

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      <SwitchCard
        checked={isTakeABreakEnabled}
        onCheckedChange={setIsTakeABreakEnabled}
        title="Take a break"
        description="Reminds you to take a break."
      />
      <SwitchCard
        checked={isBedTimeReminderEnabled}
        onCheckedChange={setIsBedTimeReminderEnabled}
        title="Bedtime Reminder"
        description="Reminds you when it's bedtime."
        comingSoon
      />
    </div>
  );
}
