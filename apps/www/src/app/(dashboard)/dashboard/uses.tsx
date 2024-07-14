import * as React from "react";

import UsesChart from "./uses-chart";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

export default async function Uses() {
  const { userId } = auth();

  const data = await db.query.tracks.findMany({
    where: (tracks, { eq }) => eq(tracks.userId, userId!),
    limit: 3 * 30, // 3 months
    orderBy: (tracks, { asc }) => asc(tracks.createdAt),
  });

  const chartData = data.map((track) => ({
    date: track.id.split("#")[0]!,
    youtube: Number.parseFloat(((track.youtubeDuration ?? 0) / 60).toFixed(2)),
    facebook: Number.parseFloat(((track.facebookDuration ?? 0) / 60).toFixed(2)),
    instagram: Number.parseFloat(((track.instagramDuration ?? 0) / 60).toFixed(2)),
  }));

  return (
    <div>
      <UsesChart chartData={chartData} />
    </div>
  );
}
