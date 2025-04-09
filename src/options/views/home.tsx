import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { ChartConfig } from "~/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { cn } from "~/lib/utils";
import { getTopWebsiteUses, getWebsiteNameFromUrl, truncateString } from "~/shared/utils";

export default function HomeView() {
  return (
    <div>
      <header className="h-20 border-b border-border bg-zinc-50 dark:bg-neutral-900 w-full px-6 flex flex-col justify-center gap-0.5">
        <p className="text-sm font-medium text-muted-foreground">
          Dashboard
        </p>
        <h2 className="text-lg font-semibold">Uses Overview</h2>
      </header>
      <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TopWebsiteUsesChartCard className="col-span-2" />
      </div>
    </div>
  );
}

function TopWebsiteUsesChartCard({ className }: { className?: string }) {
  const [chartData, setChartData] = React.useState<Array<{ url: string; uses: number; fill: string }>>([]);

  React.useEffect(() => {
    getTopWebsiteUses().then((results) => {
      // Chart colors array for cycling through different colors
      const chartColors = [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ];

      const formattedResults = results.map((item, index) => {
        const colorIndex = index % chartColors.length;
        // Convert seconds to hours for display
        const hours = item.uses / 3600;

        return {
          url: item.url,
          uses: hours,
          fill: chartColors[colorIndex],
        };
      });

      setChartData(formattedResults);
    });
  }, []);

  // Dynamically create chart config from chartData
  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};

    chartData.forEach((item) => {
      config[item.url] = {
        label: getWebsiteNameFromUrl(item.url),
        color: item.fill,
      };
    });

    return config;
  }, [chartData]) as ChartConfig;

  return (
    <section className={cn(className)}>
      <Card>
        <CardHeader>
          <CardTitle>Website Usage</CardTitle>
          <CardDescription>Top websites usage stats</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="url"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => truncateString(getWebsiteNameFromUrl(value), 5, "..")}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={value => `${value.toFixed(1)}h`}
              />
              <ChartTooltip
                cursor={false}
                content={(
                  <ChartTooltipContent
                    formatter={(value, _name, _entry) => {
                      const hours = Number(value);

                      // Format based on the value size
                      if (hours < 0.1) {
                        // For very small values, convert to minutes
                        const minutes = Math.round(hours * 60);
                        return `${minutes} min${minutes === 1 ? "" : "s"}`;
                      }
                      else {
                        // For larger values, show hours with 1 decimal place
                        return `${hours.toFixed(1)} hr${hours === 1.0 ? "" : "s"}`;
                      }
                    }}
                  />
                )}
              />
              <Bar
                dataKey="uses"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
