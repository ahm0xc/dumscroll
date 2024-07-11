"use client";

import { useUser } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function PricingPage() {
  const { isLoaded } = useUser();
  const { data: lifetimeAccessCheckoutSession, isLoading } =
    api.lemonSqueezy.getLifetimeCheckoutSession.useQuery(void {}, {
      enabled: isLoaded,
    });

  function handleGotoCheckout() {
    window.open(lifetimeAccessCheckoutSession?.checkoutUrl, "_blank");
  }

  return (
    <div>
      <Button onClick={handleGotoCheckout} disabled={isLoading}>
        Buy
      </Button>
    </div>
  );
}
