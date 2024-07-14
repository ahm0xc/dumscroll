import Link from "next/link";
import type * as React from "react";
import Logo from "~/components/logo";
import Nav from "./dashboard/nav";
import ThemeToggle from "./dashboard/theme-toggle";
import UserNav from "./dashboard/user-nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
            <p className="text-lg tracking-tight font-semibold hidden md:block">Dumscroll</p>
          </Link>
          <Nav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
