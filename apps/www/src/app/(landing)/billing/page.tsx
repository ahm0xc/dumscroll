"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import usePaddle from "~/hooks/use-paddle";

export default function BillingPage({
  searchParams,
}: {
  searchParams: { _ptxn?: string };
}) {
  const { theme } = useTheme();
  const { paddle } = usePaddle();

  useEffect(() => {
    if (!searchParams._ptxn) return;

    paddle?.Checkout.open({
      transactionId: searchParams._ptxn,
      settings: {
        theme: theme === "dark" ? "dark" : "light",
      },
    });
  }, [searchParams._ptxn]);

  if (!searchParams._ptxn)
    return (
      <div>
        <p>There's no transactionId</p>
      </div>
    );

  return null;
}
