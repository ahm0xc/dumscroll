import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

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
            <ThemeProvider>
              {children}
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
