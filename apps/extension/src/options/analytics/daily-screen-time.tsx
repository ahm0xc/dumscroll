import { Card } from "@tremor/react";

import { getDateFromTrackId } from "~/lib/utils";
import type { Track } from ".";

export default function DailyScreenTime({ tracks }: { tracks: Track[] }) {
  const today = new Date();
  const dateId = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  const todaysTracks = tracks.filter((t) => getDateFromTrackId(t.id) === dateId);

  const screenTime = todaysTracks.reduce((acc, currentTrack) => {
    return acc + currentTrack.duration;
  }, 0);
  const screenTimeMinutes = Math.floor(screenTime / 60);

  return (
    <div className="h-full">
      <Card className="mx-auto h-full max-w-md border border-border">
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Screen time
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {screenTimeMinutes < 60
            ? `${screenTimeMinutes} min`
            : `${Math.floor(screenTimeMinutes / 60)} hours ${Math.floor(screenTimeMinutes / 60) % 60} min`}
        </p>
        <p className="mt-4 flex flex-col gap-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <span>The amount of time you spent today on your browser.</span>
        </p>
      </Card>
    </div>
  );
}
