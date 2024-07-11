import type { Metadata } from "next";
import Link from "next/link";

import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Nav from "./nav";
import UserNav from "./user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function DashboardPage() {
  return (
    <main>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Link href="/dashboard">
              <Logo className="h-6 w-6 invert" />
            </Link>
            <Nav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              overview
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              analytics
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
