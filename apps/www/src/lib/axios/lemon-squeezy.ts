import axios from "axios";

import { lemonSqueezyConfig } from "~/config/lemon-squeezy";

export const lemonSqueezyApiInstance = axios.create({
  baseURL: lemonSqueezyConfig.api_endpoint,
  headers: {
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${lemonSqueezyConfig.api_token}`,
  },
});
