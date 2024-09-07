import axios from "axios";

import { env } from "~/env";

export const paddleInstance = axios.create({
  baseURL: "https://api.paddle.com/",
  headers: {
    Authorization: `Bearer ${env.PADDLE_CLIENT_SECRET}`,
  },
});
