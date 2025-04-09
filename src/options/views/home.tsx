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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { getTopWebsiteUses, getTotalTimeSpent, getWebsiteNameFromUrl, truncateString } from "~/shared/utils";

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
        <section>
          <TotalTimeSpentCard />
        </section>
      </div>
    </div>
  );
}

// Time period options
type TimePeriodOption = {
  id: string;
  label: string;
  value: { days?: number; months?: number };
};

const TIME_PERIOD_OPTIONS: TimePeriodOption[] = [
  { id: "today", label: "Today", value: { days: 0 } },
  { id: "7d", label: "Last 7 days", value: { days: 7 } },
  { id: "30d", label: "Last 30 days", value: { days: 30 } },
  { id: "3m", label: "Last 3 months", value: { months: 3 } },
];

function TopWebsiteUsesChartCard({ className }: { className?: string }) {
  const [chartData, setChartData] = React.useState<Array<{ url: string; uses: number; fill: string }>>([]);
  const [selectedPeriodId, setSelectedPeriodId] = React.useState<string>("today");

  const selectedPeriod = React.useMemo(() =>
    TIME_PERIOD_OPTIONS.find(option => option.id === selectedPeriodId) || TIME_PERIOD_OPTIONS[2], [selectedPeriodId]);

  React.useEffect(() => {
    getTopWebsiteUses({
      timeframe: selectedPeriod.value,
    }).then((results) => {
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
  }, [selectedPeriod]);

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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Website Usage</CardTitle>
            <CardDescription>Top websites usage stats</CardDescription>
          </div>
          <Select
            value={selectedPeriodId}
            onValueChange={setSelectedPeriodId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {TIME_PERIOD_OPTIONS.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

function TotalTimeSpentCard() {
  const [totalTimeSpent, setTotalTimeSpent] = React.useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = React.useState<TimePeriodOption>(TIME_PERIOD_OPTIONS[0]);

  function formatTimeSpent(timeSpent: number) {
    const hours = Math.floor(timeSpent / 3600); // Convert seconds to hours
    const minutes = Math.round((timeSpent % 3600) / 60); // Get remaining minutes
    return `${hours}h ${minutes}m`;
  }

  React.useEffect(() => {
    getTotalTimeSpent({
      timeframe: selectedPeriod.value,
    }).then((results) => {
      setTotalTimeSpent(results);
    });
  }, [selectedPeriod]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Total Time Spent</CardTitle>
          <CardDescription>Total time spent on websites</CardDescription>
        </div>
        <Select
          value={selectedPeriod.id}
          onValueChange={(value) => {
            setSelectedPeriod(TIME_PERIOD_OPTIONS.find(option => option.id === value) || TIME_PERIOD_OPTIONS[2]);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            {TIME_PERIOD_OPTIONS.map(option => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {formatTimeSpent(totalTimeSpent)}
        </p>
      </CardContent>
    </Card>
  );
}
