import * as React from "react";

import YoutubeSettingsCard from "./youtube-settings-card";
import FacebookSettingsCard from "./facebook-settings-card";

export default function Popup() {
  return (
    <main className="w-[796px] p-6">
      <div className="columns-2 gap-6 w-full">
        <div>
          <YoutubeSettingsCard />
        </div>
        <div>
          <FacebookSettingsCard />
        </div>
      </div>
    </main>
  );
}
