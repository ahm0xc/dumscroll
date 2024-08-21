import type { Track } from ".";
import { Card } from "@tremor/react";
import { cn, getPlatformNameFromUrl } from "~/lib/utils";

interface AllWebVisitedProps {
  tracks: Track[];
}

const AllWebVisited: React.FC<AllWebVisitedProps> = ({
  tracks,
}: AllWebVisitedProps) => {
  const LIMIT = 14;

  tracks = tracks.sort((a, b) => b.duration - a.duration);

  const topViewedWebsites = tracks.slice(0, LIMIT);
  const totalTime = tracks.reduce((acc, track) => acc + track.duration, 0);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Tracks</p>
          <p className="text-sm text-neutral-800">Visualize your every step.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-3">
        {topViewedWebsites.map((track) => {
          const percentage = Math.floor((track.duration / totalTime) * 100);
          const timeSpent = Math.floor(track.duration / 60);
          const timeSpentText =
            timeSpent > 60 ? `${Math.floor(timeSpent / 60)}h` : `${timeSpent}m`;

          return (
            <div
              key={`all-website-${track.id}`}
              className="relative rounded-md flex h-8 text-sm items-center bg-slate-100"
            >
              <div className="absolute inset-0 flex gap-2 items-center">
                <div
                  className="h-full rounded-[inherit] bg-orange-400 z-[1] rounded-md"
                  style={{ width: `${percentage}%` }}
                />
                <span className={cn("text-neutral-700", percentage < 10 && "ml-12")}>{timeSpentText}</span>
              </div>
              <p className="z-[2] ml-2 font-medium">
                {getPlatformNameFromUrl(track.url)}{" "}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {tracks.length - LIMIT > 0 && <p>And {tracks.length - LIMIT} more</p>}
      </div>
    </Card>
  );
};

export default AllWebVisited;
