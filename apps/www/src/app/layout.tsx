import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Dumscroll",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("antialiased", GeistSans.variable)}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
