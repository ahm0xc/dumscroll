import { sql } from "drizzle-orm";
import type { NextRequest } from "next/server";
import * as z from "zod";

import { generateTrackId } from "~/lib/utils";

import { db } from "~/server/db";
import { tracks } from "~/server/db/schema";

const postRequestParser = z.object({
  url: z.string(),
  duration: z.number(),
  licenseKey: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedResult = postRequestParser.safeParse(body);

  if (!parsedResult.success) {
    return new Response(JSON.stringify({ error: "Unhandled data" }), {
      status: 400,
    });
  }

  const parsedBody = parsedResult.data;

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.licenseKey, parsedBody.licenseKey),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    await db
      .insert(tracks)
      .values({
        id: generateTrackId({ userId: user.id, websiteUrl: parsedBody.url }),
        userId: user.id,
        url: parsedBody.url,
        duration: parsedBody.duration,
      })
      .onConflictDoUpdate({
        target: tracks.id,
        set: {
          duration: sql`${tracks.duration} + ${parsedBody.duration}`,
        },
      });

    return new Response(JSON.stringify({ userId: user.id, licenseKey: parsedBody.licenseKey }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
