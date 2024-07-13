import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Overview from "./overview";
import UsesChart from "./uses-chart";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function DashboardPage() {
  return (
    <main>
      <div className="flex-col flex">
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
