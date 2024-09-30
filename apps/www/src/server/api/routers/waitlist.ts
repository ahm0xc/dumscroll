import { z } from "zod";

import { db } from "~/server/db";
import { waitlists } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const waitlistRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({ email: z.string() })).mutation(async ({ input }) => {
    await db.insert(waitlists).values(input);
  }),
});
