import { lemonSqueezyConfig } from "~/config/lemon-squeezy";
import { lemonSqueezyApiInstance } from "~/lib/axios/lemon-squeezy";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const lemonSqueezyRouter = createTRPCRouter({
  getLifetimeCheckoutSession: protectedProcedure.query(async ({ ctx }) => {
    const { data } = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: ctx.auth.userId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: lemonSqueezyConfig.store_id.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: lemonSqueezyConfig.products.lifetime_access.variant_id.toString(),
            },
          },
        },
      },
    });

    return { checkoutUrl: data.data.attributes.url };
  }),
});
