import type { Metadata } from "next";
import Link from "next/link";

import Logo from "~/components/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Nav from "./nav";
import UserNav from "./user-nav";
import ThemeToggle from "./theme-toggle";
import UsesChart from "./uses-chart";
import Overview from "./overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function DashboardPage() {
  return (
    <main>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo className="h-6 w-6 invert dark:invert-0" />
              <p className="text-lg tracking-tight font-semibold hidden md:block">Dumscroll</p>
            </Link>
            <Nav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>{" "}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Uses</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div>
                <UsesChart />
              </div>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              reports
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
