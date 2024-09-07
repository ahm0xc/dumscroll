import { auth } from "@clerk/nextjs/server";
import { type Environment, Paddle } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

import { env } from "~/env";
import { db } from "~/server/db";

const paddle = new Paddle(env.PADDLE_CLIENT_SECRET, {
  environment: env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment,
});

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const dbUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, userId),
  });

  if (!dbUser) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      },
    );
  }

  if (!dbUser.subscriptionId) {
    return NextResponse.json({
      status: null,
      plan: null,
      id: null,
      customerId: dbUser.customerId,
    });
  }

  const subscription = await paddle.subscriptions.get(dbUser.subscriptionId);

  return NextResponse.json({
    status: dbUser.subscriptionStatus,
    plan: dbUser.subscriptionPlanId,
    id: dbUser.subscriptionId,
    customerId: dbUser.customerId,
    updatePaymentMethodUrl: subscription.managementUrls?.updatePaymentMethod,
    cancelUrl: subscription.managementUrls?.cancel,
  });
}
