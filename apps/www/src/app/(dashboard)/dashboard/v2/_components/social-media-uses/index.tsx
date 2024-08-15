import { auth } from "@clerk/nextjs/server";
import React from "react";

import { unstable_cache } from "next/cache";
import { socialMediaPlatforms } from "~/config/general";
import { generateTrackId } from "~/lib/utils";
import { db } from "~/server/db";
import { Chart } from "./chart";

async function getResults({ userId }: { userId?: string | null }) {
  if (!userId) return null;

  const ids = socialMediaPlatforms.map((platform) =>
    generateTrackId({ userId, websiteUrl: platform.url }),
  );

  const results = await db.query.tracks.findMany({
    where: (tracks, { inArray }) => inArray(tracks.id, ids),
  });

  return results;
}

const getCachedResults = unstable_cache(getResults, ["social-media-uses"], {
  revalidate: 3600,
});

export default async function SocialMediaUses() {
  const { userId } = auth();
  const results = await getCachedResults({ userId });
  if (!results) return;

  return (
    <div>
      <Chart tracks={results} />
    </div>
  );
}
