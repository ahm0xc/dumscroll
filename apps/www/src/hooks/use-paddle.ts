import { type Paddle, initializePaddle } from "@paddle/paddle-js";
import React from "react";

import { env } from "~/env";

export default function usePaddle() {
  const [paddle, setPaddle] = React.useState<Paddle>();

  React.useEffect(() => {
    initializePaddle({
      environment: env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
      token: env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  return { paddle };
}
