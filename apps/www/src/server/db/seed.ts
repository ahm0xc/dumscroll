import dayjs from "dayjs";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  generateTrackId,
  getRandomItemFromArray,
  getRandomNumberInRange,
} from "~/lib/utils";
import * as schema from "./schema";
dotenv.config();

const userId = "user_2kepQzzL9nnXaWJzmpuofgosvzg"; // ahmed

const allowedWebsites = [
  "https://facebook.com",
  "https://messenger.com",
  "https://twitter.com",
  "https://jokuh.com",
  "https://linkedin.com",
  "https://example.com",
  "https://dumscroll.com",
  "https://chatgpt.com",
  "https://groq.com",
  "https://claude.ai",
  "https://discord.com",
  "https://youtube.com",
  "https://unkey.dev",
  "https://unsplash.dev",
  "https://orm.drizzle.team/",
  "https://ui.shadcn.com",
  "https://writerz.vercel.app",
  "https://wikipedia.com",
  "https://whatsapp.com",
  "https://pinterest.com",
  "https://reddit.com",
  "https://amazon.com",
  "https://imdb.com",
  "https://apple.com",
  "https://fandom.com",
  "https://canva.com",
  "https://adobe.com",
  "https://cookpad.com",
  "https://etsy.com",
  "https://poki.com",
  "https://bbc.com",
  "https://spotify.com",
  "https://nike.com",
  "https://gov.uk",
  "https://ebay.com",
];

async function main() {
  const conn = postgres(process.env.DATABASE_URL!);
  const db = drizzle(conn, { schema });

  const today = dayjs();

  const data: (typeof schema.tracks.$inferInsert)[] = [];

  for (let i = 0; i < 40; i++) {
    const currentDate = today.subtract(i, "days");

    allowedWebsites.forEach((web) => {
      const duration = getRandomNumberInRange(0, 4600);
      if (duration < 500) return;

      data.push({
        id: generateTrackId({ userId, websiteUrl: web, today: currentDate }),
        userId,
        duration,
        url: web,
      });
    });
  }

  // const data: (typeof schema.tracks.$inferInsert)[] = Array.from({
  //   length: 30,
  // }).map((_, i) => {
  //   const currentDate = today.subtract(i + 3, "days");
  //   const url = getRandomItemFromArray(allowedWebsites) as string;
  //   return {
  //     id: generateTrackId({ userId, websiteUrl: url, today: currentDate }),
  //     userId,
  //     duration: getRandomNumberInRange(120, 2000),
  //     url,
  //   };
  // });

  // const data: (typeof schema.tracks.$inferInsert)[] = allowedWebsites.map(
  //   (url) => {
  //     const currentDate = today.subtract(2, "days");

  //     return {
  //       id: generateTrackId({ userId, websiteUrl: url, today: currentDate }),
  //       url: url,
  //       userId: userId,
  //       duration: getRandomNumberInRange(120, 2000),
  //     };
  //   },
  // );

  await db.insert(schema.tracks).values(data);
}

main().then(() => {
  console.info("Done");
});
