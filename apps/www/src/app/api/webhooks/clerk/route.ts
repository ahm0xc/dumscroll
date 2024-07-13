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

  try {
    if (evt.type === "user.created") {
      const emailAddress =
        evt.data.email_addresses.find((x) => x.id === evt.data.primary_email_address_id)
          ?.email_address ?? evt.data.email_addresses[0]?.email_address!;

      await db.insert(users).values({
        id: evt.data.id,
        email: emailAddress,
      });
    }

    return new Response(`USER/CREATED:${evt.data.id}`, { status: 200 });
  } catch (error) {
    console.error("Error creating user in the database:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
