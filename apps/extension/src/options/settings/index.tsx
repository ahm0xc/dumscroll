import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

import ProductivitySettings from "./productivity";
import RemindersSettings from "./reminders";
import Schedule from "./schedule";
import SettingsNavigation, {
  useSettingsNavigation,
} from "./settings-navigation";
import UsesTrackingSettings from "./uses-tracking";
import GeneralSettings from "./general";

export default function Settings() {
  const [ui] = useSettingsNavigation((state) => [state.ui]);

  return (
    <div>
      <div>
        <h1 className="font-semibold text-2xl">Settings</h1>
      </div>
      <div className="mt-6">
        <SettingsNavigation />
      </div>
      <div className="mt-6">
        {ui === "general" && (
          <BlurWrapper>
            <GeneralSettings />
          </BlurWrapper>
        )}
        {ui === "uses-tracking" && (
          <BlurWrapper>
            <UsesTrackingSettings />
          </BlurWrapper>
        )}
        {ui === "schedule" && (
          <BlurWrapper>
            <Schedule />
          </BlurWrapper>
        )}
        {ui === "productivity" && (
          <BlurWrapper>
            <ProductivitySettings />
          </BlurWrapper>
        )}
        {ui === "reminders" && (
          <BlurWrapper>
            <RemindersSettings />
          </BlurWrapper>
        )}
      </div>
    </div>
  );
}

function BlurWrapper({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
    >
      {children}
    </motion.div>
  );
}
