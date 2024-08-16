import { useState } from "react";
import { BarChart, Card, Tab, TabGroup, TabList } from "@tremor/react";
import dayjs from "dayjs";
import type { Track } from ".";
import { getFormattedTracks, getPlatformNameFromUrl } from "~/lib/utils";
import { socialMediaPlatforms } from "~/config";

const filters = [
  {
    days: 1,
    label: "Today",
  },
  {
    days: 7,
    label: "This week",
  },
  {
    days: 30,
    label: "This month",
  },
];
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

const valueFormatter = (number: number) => number;

export default function DailyUses({ tracks }: { tracks: Track[] }) {
  const [dataOfDays, setDataOfDays] = useState(14);

  const ft = getFormattedTracks(tracks);
  const socialMediaNames = socialMediaPlatforms.map((p) =>
    p.name.toLowerCase(),
  );
  const socialMediaColors = socialMediaPlatforms.map((p) => p.colorName);

  const today = dayjs();

  const formattedChartData = ft
    .map((f) => {
      const socialTracks = f.tracks.filter((t) =>
        socialMediaNames.includes(getPlatformNameFromUrl(t.url)),
      );

      return {
        date: dateFormatter(f.date),
        rawDate: f.date,
        ...socialTracks.reduce((acc, t) => {
          // @ts-ignore
          acc[getPlatformNameFromUrl(t.url)] = t.duration;
          return acc;
        }, {}),
      };
    })
    .filter((x) =>
      dayjs(x.rawDate).isAfter(today.subtract(dataOfDays, "days")),
    );

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Daily uses</p>
          <p className="text-sm text-neutral-800">
            All websites you visited today.
          </p>
        </div>
        <div>
          <TabGroup
            onIndexChange={(i) => setDataOfDays(filters[i].days)}
            defaultIndex={1}
          >
            <TabList variant="solid" color="blue">
              {filters.map((f) => (
                <Tab value={f.days} key={`filter-${f.days}/${f.label}`}>
                  {f.label}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>
      <BarChart
        className="mt-6"
        data={formattedChartData}
        index="date"
        categories={socialMediaNames}
        colors={socialMediaColors}
        // valueFormatter={valueFormatter}
        yAxisWidth={48}
        customTooltip={customTooltip}
      />
    </Card>
  );
}

type CustomTooltipTypeBar = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  payload: any;
  active: boolean | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  label: any;
};

const customTooltip = (props: CustomTooltipTypeBar) => {
  const { payload, active } = props;
  if (!active || !payload) return null;

  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown bg-background">
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {payload.map((category: any, idx: number) => (
        <div
          key={`custom-tool-tip-daily-social-media-uses-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            idx
          }`}
          className="flex flex-1 space-x-2.5"
        >
          <div
            className={`flex w-1.5 h-1.5 flex-col bg-${category.color}-500 rounded-full mt-2`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {valueFormatter(category.value)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
