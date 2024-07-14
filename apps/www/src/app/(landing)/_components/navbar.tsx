import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ChromeIcon } from "lucide-react";

import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  const { userId } = auth();
  return (
    <nav className="sticky top-0 w-full px-6 py-4 border-b bg-background z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <p className="text-lg font-semibold">Dumscroll</p>
            </Link>
          </div>
          <div className="gap-3 items-center flex">
            <Button asChild variant="ghost">
              <Link href={userId ? "/dashboard" : "/sign-up"}>
                {userId ? "Dashboard" : "Sign up"}
              </Link>
            </Button>
            <Button className="w-fit" asChild>
              <a href="https://chromewebstore.google.com/" target="_blank" rel="noreferrer">
                <ChromeIcon className="w-5 mr-2" /> Get extension
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
