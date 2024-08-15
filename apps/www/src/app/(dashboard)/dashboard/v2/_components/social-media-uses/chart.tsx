"use client";

import { FaceIcon } from "@radix-ui/react-icons";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { socialMediaPlatforms } from "~/config/general";
import type { Track } from "~/server/db/schema";

// function formatDate(date: Date) {
//   // Define an array with month names
//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // Extract day, month, and year from the date
//   const d = new Date(date);
//   const day = d.getDate();
//   const month = monthNames[d.getMonth()];
//   const year = d.getFullYear();

//   // Format the date as 'DD MMM YYYY'
//   return `${day} ${month} ${year}`;
// }

// function getPlatformNameFromUrl(url: string) {
//   return (
//     url
//       .replace("https://", "")
//       .replace("http://", "")
//       .replace("www.", "")
//       .split(".")[0] ?? ""
//   );
// }

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// const cConfig = socialMediaPlatforms.reduce((acc, platform) => {
//   // @ts-ignore
//   acc[platform.name.toLowerCase()] = {
//     label: platform.name,
//     color: platform.color,
//   };
//   return acc;
// }, {});

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export function Chart({ tracks: _ }: { tracks: Track[] }) {
  // const cData = socialMediaPlatforms.map((platform) => {
  //   const track = tracks.find(
  //     (t) => getPlatformNameFromUrl(t.url) === platform.name.toLowerCase(),
  //   );
  //   if (!track) {
  //     return {
  //       month: formatDate(new Date()),
  //       [platform.name.toLowerCase()]: 0,
  //     };
  //   }

  //   const platformName = getPlatformNameFromUrl(track.url);
  //   return {
  //     date: formatDate(track.createdAt),
  //     [platformName]: track.duration,
  //   };
  // });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
