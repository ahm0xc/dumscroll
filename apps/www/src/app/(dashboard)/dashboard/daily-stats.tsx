import React from "react";
import { auth } from "@clerk/nextjs/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import DailyStatsChart from "./daily-stats-chart";
import { db } from "~/server/db";

const months = [
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

export default async function DailyStats() {
  const { userId } = auth();
  const dateNow = new Date();
  const genID = `${dateNow.getFullYear()}-${dateNow.getMonth().toString().padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}#${userId}`;

  const data = await db.query.tracks.findFirst({
    where: (tracks, { eq }) => eq(tracks.id, genID),
  });

  const chartData = [
    { platform: "Youtube", duration: Number.parseFloat(((data?.youtubeDuration ?? 0) / 60).toFixed(1)) },
    { platform: "Facebook", duration: Number.parseFloat(((data?.facebookDuration ?? 0) / 60).toFixed(1)) },
    { platform: "Instagram", duration: Number.parseFloat(((data?.instagramDuration ?? 0) / 60).toFixed(1)) },
  ];

  return (
    <Card className="border-none rounded-[inherit]">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Daily uses</CardTitle>
        <CardDescription className="text-sm">
          Showing stats for {new Date().getDate()} {months[new Date().getMonth()]} {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DailyStatsChart chartData={chartData} />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <p className="flex gap-2 font-medium leading-none text-foreground/70">
          Stats of social media uses.
        </p>
      </CardFooter>
    </Card>
  );
}
