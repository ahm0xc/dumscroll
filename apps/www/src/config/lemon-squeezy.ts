import { env } from "~/env";

export const lemonSqueezyConfig = {
  store_id: env.LEMON_SQUEEZY_STORE_ID,
  api_endpoint: "https://api.lemonsqueezy.com/v1",
  api_token: env.LEMON_SQUEEZY_API_TOKEN,
  store_url: "https://dumscroll-test.lemonsqueezy.com",
  products: {
    lifetime_access: {
      variant_id: "447171",
    },
  },
};
