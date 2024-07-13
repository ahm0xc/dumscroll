import type { NextRequest } from "next/server";
import * as z from "zod";

import { db } from "~/server/db";

const postRequestParser = z.object({
  customerId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedResult = postRequestParser.safeParse(body);

  if (!parsedResult.success) {
    return new Response(JSON.stringify({ error: "Unhandled data" }), {
      status: 401,
    });
  }

  const parsedBody = parsedResult.data;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.customerId, parsedBody.customerId),
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ customerId: user.customerId, email: user.email }), { status: 201 });
}
