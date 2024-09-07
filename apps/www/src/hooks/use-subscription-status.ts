"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSubscriptionStatus() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: async () => {
      const { data } = await axios.get<{
        status: string;
        plan: string;
        id: string;
        customerId: string;
        updatePaymentMethodUrl?: string;
        cancelUrl?: string;
      }>("/api/subscription/status");

      return data;
    },
  });

  const isSubscribed = data?.status === "active" || data?.status === "trialing";
  const isTrial = data?.status === "trialing";

  return { data, isLoading, error, isSubscribed, isTrial };
}
