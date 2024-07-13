import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { env } from "~/env";
import { db } from "~/server/db";
import GetStarted from "./get-started";

export default async function GetStartedPage() {
  const { userId } = auth();
  if (!userId) {
    redirect(env.NEXT_PUBLIC_CLERK_SIGN_IN_URL);
    return null; // Redirect to sign-in page if user is not authenticated.
  }
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user) {
    return "User not found.";
  }
  return (
    <div className="p-8 pb-20">
      <GetStarted customerId={user.customerId} />
    </div>
  );
}
