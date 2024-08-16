import { useEffect, useState } from "react";
import { toast } from "sonner";

import { settings } from "~/config";
import useGlobalStorage from "~/hooks/globalstorage";
import DailyScreenTime from "./daily-screen-time";
import DailySocialMediaUses from "./daily-social-media-uses";
import DailyTimeSaved from "./daily-time-saved";
import DailyUses from "./daily-uses";

export interface Track {
  id: string;
  userId: string;
  url: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Analytics() {
  const [tracksData, setTracksData] = useState<Track[] | null>(null);

  const { value: license } = useGlobalStorage<string>("", {
    key: settings.activation.license.key,
  });

  useEffect(() => {
    async function getTrackData(license: string) {
      try {
        const data = await fetch(
          `https://dumscroll.vercel.app/api/track/get?licenseKey=${license}`,
        ).then((r) => r.json());

        setTracksData(
          (data.tracks as Track[]).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      } catch (error) {
        toast.error("Failed to get track data");
        console.error(error);
      }
    }
    if (!license) return;
    getTrackData(license);
  }, [license]);

  return (
    <div className="pb-28">
      <div>
        <h1 className="font-semibold text-2xl">Uses analytics</h1>
      </div>
      <div className="mt-6">
        {(tracksData?.length ?? 0) < 3 && (
          <p className="text-gray-700 dark:text-gray-300">No track data available</p>
        )}
        {!!tracksData?.length && (
          <section className="grid grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
              <DailyTimeSaved tracks={tracksData} />
            </div>
            <div>
              <DailyScreenTime tracks={tracksData} />
            </div>
            <div className="col-span-2 xl:col-span-3">
              <DailyUses tracks={tracksData} />
            </div>
            <div className="col-span-2 xl:col-span-3">
              <DailySocialMediaUses tracks={tracksData} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
