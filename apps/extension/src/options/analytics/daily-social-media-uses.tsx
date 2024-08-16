import { Card, LineChart } from "@tremor/react";
import React from "react";

import { socialMediaPlatforms } from "~/config";
import { getFormattedTracks, getPlatformNameFromUrl } from "~/lib/utils";
import type { Track } from ".";

const valueFormatter = (number: number) => `${Math.floor(number / 60)} min`;
function dateFormatter(date: string) {
  const d = new Date(date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)}`;
}

// type CustomTooltipTypeBar = {
//   payload: any;
//   active: boolean | undefined;
//   label: string;
// };

export default function DailySocialMediaUses({ tracks }: { tracks: Track[] }) {
  const ft = getFormattedTracks(tracks);
  const socialMediaNames = socialMediaPlatforms.map((p) => p.name.toLowerCase());
  const socialMediaColors = socialMediaPlatforms.map((p) => p.colorName);

  const formattedChartData = ft.map((f) => {
    const socialTracks = f.tracks.filter((t) =>
      socialMediaNames.includes(getPlatformNameFromUrl(t.url)),
    );

    return {
      date: dateFormatter(f.date),
      ...socialTracks.reduce((acc, t) => {
        // @ts-ignore
        acc[getPlatformNameFromUrl(t.url)] = t.duration;
        return acc;
      }, {}),
    };
  });

  // const customTooltip = (props: CustomTooltipTypeBar) => {
  //   const { payload, active } = props;
  //   if (!active || !payload) return null;

  //   return (
  //     <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown bg-background">
  //       {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
  //       {payload.map((category: any, idx: number) => (
  //         <div
  //           key={`custom-tool-tip-daily-social-media-uses-${
  //             // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  //             idx
  //           }`}
  //           className="flex flex-1 space-x-2.5"
  //         >
  //           <div
  //             className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
  //           />
  //           <div className="space-y-1">
  //             <p className="text-tremor-content">{category.dataKey}</p>
  //             <p className="font-medium text-tremor-content-emphasis">
  //               {valueFormatter(category.value)}
  //             </p>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <Card>
      <div className="">
        <p className="font-medium">Social media uses</p>
        <p className="text-sm text-neutral-800">Keep track of your social media uses.</p>
      </div>
      <LineChart
        className="mt-4 h-72"
        data={formattedChartData}
        index="date"
        yAxisWidth={65}
        categories={socialMediaNames}
        colors={socialMediaColors}
        valueFormatter={valueFormatter}
        // customTooltip={customTooltip}
      />
    </Card>
  );
}
