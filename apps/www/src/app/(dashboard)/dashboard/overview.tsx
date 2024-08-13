import React from "react";

import DailyStats from "./daily-stats";
import SevenDaysAnalyticsCard from "./seven-days-analytics-card";
import TimeSaved from "./time-saved";

export default function Overview() {
  return (
    <div className="h-screen">
      <div className="grid h-full w-full grid-cols-8 grid-rows-8 gap-4">
        <div className="col-span-2 row-span-3 h-full max-h-full w-full max-w-full rounded-2xl border">
          <DailyStats />
        </div>
        <div className="col-span-4 row-span-3 h-full max-h-full w-full max-w-full rounded-2xl border">
          <SevenDaysAnalyticsCard />
        </div>
        <div className="col-span-2 row-span-4 h-full max-h-full w-full max-w-full rounded-2xl border">
          <TimeSaved />
        </div>
        <div className="col-span-3 row-span-3 h-full max-h-full w-full max-w-full rounded-2xl border bg-indigo-300" />
        {/* <div className="col-span-2 row-span-2 bg-indigo-300 w-full h-full rounded-2xl max-w-full max-h-full border">
          j
        </div> */}
      </div>
    </div>
  );
}
