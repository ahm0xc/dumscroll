import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";

import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  if (evt.type === "user.created") {
    await db.insert(users).values({
      id: evt.data.id,
      name: `${evt.data.first_name} ${evt.data.last_name}`.trim(),
      username: evt.data.username!,
      email:
        evt.data.email_addresses.find((x) => x.id === evt.data.primary_email_address_id)
          ?.email_address ?? evt.data.email_addresses[0]?.email_address!,
    });
  }
  if (evt.type === "user.updated") {
    await db
      .update(users)
      .set({
        name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
        username: evt.data.username!,
        email:
          evt.data.email_addresses.find((x) => x.id === evt.data.primary_email_address_id)
            ?.email_address ?? evt.data.email_addresses[0]?.email_address!,
      })
      .where(eq(users.id, evt.data.id));
  }

  return new Response("", { status: 200 });
}
