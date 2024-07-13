import { auth } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";
import type { NextRequest } from "next/server";
import * as z from "zod";
import { db } from "~/server/db";
import { tracks } from "~/server/db/schema";

const postRequestParser = z.object({
  platform: z.enum(["youtube", "facebook", "instagram"]),
  duration: z.number(),
  customerId: z.string().uuid(),
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
      where: (users, { eq }) => eq(users.customerId, parsedBody.customerId),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const dateNow = new Date();
    const genID = `${dateNow.getFullYear()}-${dateNow.getMonth().toString().padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}#${user.id}`;

    switch (parsedBody.platform.toLowerCase()) {
      case "youtube":
        await db
          .insert(tracks)
          .values({
            id: genID,
            userId: user.id,
            youtubeDuration: parsedBody.duration,
          })
          .onConflictDoUpdate({
            target: tracks.id,
            set: {
              youtubeDuration: sql`${tracks.youtubeDuration} + ${parsedBody.duration}`,
            },
          });
        break;
      case "facebook":
        await db
          .insert(tracks)
          .values({
            id: genID,
            userId: user.id,
            facebookDuration: parsedBody.duration,
          })
          .onConflictDoUpdate({
            target: tracks.id,
            set: {
              facebookDuration: sql`${tracks.facebookDuration} + ${parsedBody.duration}`,
            },
          });
        break;
      case "instagram":
        await db
          .insert(tracks)
          .values({
            id: genID,
            userId: user.id,
            instagramDuration: parsedBody.duration,
          })
          .onConflictDoUpdate({
            target: tracks.id,
            set: {
              instagramDuration: sql`${tracks.instagramDuration} + ${parsedBody.duration}`,
            },
          });
        break;

      default:
        break;
    }

    return new Response(JSON.stringify({ userId: user.id, customerId: parsedBody.customerId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
