import { type NextRequest, NextResponse } from "next/server";

import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { validateSignature } from "./utils";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("Paddle-Signature")!;
  const body = await req.text();

  const isValid = await validateSignature(signature, body, env.PADDLE_WEBHOOK_SECRET_TOKEN);

  if (!isValid) {
    return NextResponse.json(
      {
        message: "Invalid webhook signature!",
      },
      {
        status: 401,
      },
    );
  }
  const parsedBody = JSON.parse(body);
  const userId = parsedBody.data.custom_data.userId;

  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required!",
      },
      {
        status: 400,
      },
    );
  }

  switch (parsedBody.event_type) {
    case "subscription.created": {
      const subscriptionId = parsedBody.data.id;
      const customerId = parsedBody.data.customer_id;
      const subscriptionPlanId = parsedBody.data.items[0].price.id;
      const subscriptionStatus = parsedBody.data.status;

      await db.update(users).set({
        subscriptionId,
        customerId,
        subscriptionPlanId,
        subscriptionStatus,
      });

      break;
    }
    case "subscription.updated": {
      const subscriptionId = parsedBody.data.id;
      const customerId = parsedBody.data.customer_id;
      const subscriptionPlanId = parsedBody.data.items[0].price.id;
      const subscriptionStatus = parsedBody.data.status;

      await db.update(users).set({
        subscriptionId,
        customerId,
        subscriptionPlanId,
        subscriptionStatus,
      });

      break;
    }
    case "subscription.cancelled": {
      const subscriptionId = parsedBody.data.id;
      const customerId = parsedBody.data.customer_id;
      const subscriptionPlanId = parsedBody.data.items[0].price.id;
      const subscriptionStatus = parsedBody.data.status;

      await db.update(users).set({
        subscriptionId,
        customerId,
        subscriptionPlanId,
        subscriptionStatus,
      });
      break;
    }
    case "subscription.activated":
      break;
    case "subscription.trialing":
      break;
    default:
      break;
  }

  return NextResponse.json(
    {
      message: "done",
    },
    {
      status: 200,
    },
  );
}
