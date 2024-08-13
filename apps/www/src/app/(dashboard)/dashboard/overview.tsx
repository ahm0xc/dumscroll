import React from "react";

import DailyStats from "./daily-stats";
import GithubCard from "./github-card";
import SevenDaysAnalyticsCard from "./seven-days-analytics-card";
import TimeSaved from "./time-saved";

export default function Overview() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-8 gap-4 grid-rows-8 w-full h-full">
        <div className="col-span-2 row-span-3 w-full h-full rounded-2xl max-w-full max-h-full border">
          <DailyStats />
        </div>
        <div className="col-span-4 row-span-3 w-full h-full rounded-2xl max-w-full max-h-full border">
          <SevenDaysAnalyticsCard />
        </div>
        <div className="col-span-2 row-span-4 w-full h-full rounded-2xl max-w-full max-h-full border">
          <TimeSaved />
        </div>
        <div className="col-span-3 row-span-3 bg-indigo-300 w-full h-full rounded-2xl max-w-full max-h-full border" />
        <div className="col-span-3 row-span-2 w-full h-full rounded-2xl max-w-full max-h-full border">
          <GithubCard />
        </div>
        {/* <div className="col-span-2 row-span-2 bg-indigo-300 w-full h-full rounded-2xl max-w-full max-h-full border">
          j
        </div> */}
      </div>
    </div>
  );
}
