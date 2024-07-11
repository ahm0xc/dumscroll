import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Dumscroll",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("antialiased", GeistSans.variable)}>
        <body className="antialiased font-sans" suppressHydrationWarning>
          <TRPCReactProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
