import dayjs from "dayjs";
import type { NextRequest } from "next/server";
import { generateTrackId } from "~/lib/utils";

import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const licenseKey = searchParams.get("licenseKey");
  if (!licenseKey) {
    return new Response(JSON.stringify({ error: "License key is required" }), {
      status: 400,
    });
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.licenseKey, licenseKey),
  });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found. The license key is invalid" }),
      {
        status: 404,
      },
    );
  }

  const today = dayjs();
  const trackIdPrefixes = Array.from({ length: 30 }).map((_, i) => {
    const currentDate = today.subtract(i, "days");
    const prefix = generateTrackId({
      userId: user.id,
      today: currentDate,
      websiteUrl: "",
    });

    return prefix
  });

  const tracks = await db.query.tracks.findMany({
    where: (track, {or, like}) => or(...trackIdPrefixes.map(p => like(track.id, `${p}%`)))
  })

  return new Response(JSON.stringify({ licenseKey, tracks }), { status: 200 });
}
