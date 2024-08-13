import dayjs from "dayjs";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getRandomNumberInRange } from "~/lib/utils";
import * as schema from "./schema";
dotenv.config();

// const userID = "user_2jBuFeoRpScQC5TE9vT2JWNV7oC"; // abid
const userID = "user_2jAqwEaQDLvAE7isJD6fyhLfkir"; // ahmed

async function main() {
  const conn = postgres(process.env.DATABASE_URL!);
  const db = drizzle(conn, { schema });

  const today = dayjs();

  const data: (typeof schema.tracks.$inferInsert)[] = Array.from({ length: 100 }).map((_, i) => {
    const r = today.subtract(i, "days");
    return {
      id: `${r.get("year").toString().padStart(4, "0")}-${(r.get("month") + 1).toString().padStart(2, "0")}-${r.get("date").toString().padStart(2, "0")}#${userID}`,
      youtubeDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      facebookDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      instagramDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      userId: userID,
    };
  });

  await db.insert(schema.tracks).values(data);
}

main();
