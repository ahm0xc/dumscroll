import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import dayjs from "dayjs";
import { getRandomNumberInRange } from "~/lib/utils";
dotenv.config();

const userID = "user_2jBuFeoRpScQC5TE9vT2JWNV7oC";

async function main() {
  const conn = postgres(process.env.DATABASE_URL!);
  const db = drizzle(conn, { schema });

  const today = dayjs();

  const data: (typeof schema.tracks.$inferInsert)[] = Array.from({ length: 100 }).map((_, i) => {
    const r = today.subtract(i, "days");
    return {
      id: `${r.get("year")}-${r.get("month") + 1}-${r.get("date")}#${userID}`,
      youtubeDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      facebookDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      instagramDuration: getRandomNumberInRange(0, 60 * 60 * 4),
      userId: userID,
    };
  });

  await db.insert(schema.tracks).values(data);
}

main();
