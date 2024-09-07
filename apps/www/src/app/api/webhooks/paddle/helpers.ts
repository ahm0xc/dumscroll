import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { paymentHistories } from "~/server/db/schema";

export async function savePaymentHistory(userId: string, data: Record<string, any>) {
  if (!userId) {
    throw new Error("User ID is required//savePaymentHistory");
  }

  await db.insert(paymentHistories).values({
    userId,
    data,
  });
}
