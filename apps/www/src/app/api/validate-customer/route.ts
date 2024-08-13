import type { NextRequest } from "next/server";
import * as z from "zod";

import { db } from "~/server/db";

const postRequestParser = z.object({
  licenseKey: z.string().uuid(),
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
    where: (users, { eq }) => eq(users.licenseKey, parsedBody.licenseKey),
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ licenseKey: user.licenseKey, email: user.email }), {
    status: 201,
  });
}
