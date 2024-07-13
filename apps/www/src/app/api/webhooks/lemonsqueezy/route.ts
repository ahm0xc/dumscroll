import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import crypto from "node:crypto";
import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(req: NextRequest) {
  try {
    const reqClone = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    const secret = env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(await reqClone.text()).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("X-Signature") ?? "", "utf-8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature");
    }

    if (eventType === "order_created") {
      // const userId = body.meta.custom_data.user_id;
      // const isSuccessful = body.data.attributes.status === "paid";

      console.info(JSON.stringify(body, undefined, 2));

      // await db
      //   .update(users)
      //   .set({
      //     isActive: isSuccessful,
      //   })
      //   .where(eq(users.id, userId));
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
