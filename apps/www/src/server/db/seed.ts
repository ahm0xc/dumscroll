import dayjs from "dayjs";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { generateTrackId, getRandomItemFromArray, getRandomNumberInRange } from "~/lib/utils";
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
];

async function main() {
  const conn = postgres(process.env.DATABASE_URL!);
  const db = drizzle(conn, { schema });

  const today = dayjs();

  // const data: (typeof schema.tracks.$inferInsert)[] = Array.from({
  //   length: 100,
  // }).map((_, i) => {
  //   const r = today.subtract(i, "days");
  //   const url = getRandomItemFromArray(allowedWebsites) as string;
  //   return {
  //     id: `${r.get("year").toString().padStart(4, "0")}-${(r.get("month") + 1).toString().padStart(2, "0")}-${r.get("date").toString().padStart(2, "0")}#${userID}#${url}`,
  //     userId: userID,
  //     duration: getRandomNumberInRange(120, 2000),
  //     url,
  //   };
  // });

  const data: (typeof schema.tracks.$inferInsert)[] = allowedWebsites.map((url) => {
    return {
      id: generateTrackId({ userId, websiteUrl: url, today }),
      url: url,
      userId: userId,
      duration: getRandomNumberInRange(120, 2000),
    };
  });

  await db.insert(schema.tracks).values(data);
}

main().then(() => {
  console.info("Done");
});
