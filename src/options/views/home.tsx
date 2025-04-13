import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { ChartConfig } from "~/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { SOCIAL_MEDIA_PLATFORMS, STREAMING_PLATFORMS } from "~/shared/config";
import { getDailyAverageTimeSpent, getDomainNameFromUrl, getTopWebsiteUses, getTotalTimeSpent, getUses, getWebsiteNameFromUrl, truncateString } from "~/shared/utils";

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
        <section className="space-y-6">
          <TotalTimeSpentCard />
          <DailyAverageTimeSpentCard />
        </section>
        <PlatformUsageChartCard className="col-span-2" />
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
      const formattedResults = results.map((item, index) => {
        // Convert seconds to hours for display
        const hours = item.uses / 3600;

        return {
          url: item.url,
          uses: hours,
          fill: index === 0 ? "#4f46e5" : "#818cf8",
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
                      if (hours < 1) {
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

function DailyAverageTimeSpentCard() {
  const [dailyAverageTimeSpent, setDailyAverageTimeSpent] = React.useState<number>(0);

  function formatTimeSpent(timeSpent: number) {
    const hours = Math.floor(timeSpent / 3600); // Convert seconds to hours
    const minutes = Math.round((timeSpent % 3600) / 60); // Get remaining minutes
    return `${hours}h ${minutes}m`;
  }

  React.useEffect(() => {
    getDailyAverageTimeSpent({}).then((results) => {
      setDailyAverageTimeSpent(results);
    });
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Daily Average Time Spent</CardTitle>
          <CardDescription>Daily average time spent on websites</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {formatTimeSpent(dailyAverageTimeSpent)}
        </p>
      </CardContent>
    </Card>
  );
}

function PlatformUsageChartCard({ className }: { className?: string }) {
  const [chartData, setChartData] = React.useState<Array<{ hour: string; social: number; streaming: number; others: number }>>([]);

  // Add chart config
  const chartConfig = React.useMemo(() => {
    return {
      social: {
        label: "Social",
        color: "#4f46e5",
      },
      streaming: {
        label: "Streaming",
        color: "#ec4899",
      },
      others: {
        label: "Others",
        color: "#10b981",
      },
    };
  }, []) as ChartConfig;

  React.useEffect(() => {
    getUses({ timeframe: { days: 1 } }).then((results) => {
      // Group visits by hour of day
      const hourlyData: Record<string, { social: number; streaming: number; others: number }> = {};

      // Initialize data for all 24 hours
      for (let i = 0; i < 24; i++) {
        const hour = i.toString();
        hourlyData[hour] = { social: 0, streaming: 0, others: 0 };
      }

      // Process each site's usage
      results.forEach((site) => {
        // Get domain from URL to categorize
        const domain = getDomainNameFromUrl(site.url);

        // Determine category based on platform lists in config
        const isSocial = SOCIAL_MEDIA_PLATFORMS.some(platform =>
          typeof platform.url === "string"
            ? domain.includes(getDomainNameFromUrl(platform.url))
            : platform.url.some(url => domain.includes(getDomainNameFromUrl(url))),
        );

        const isStreaming = STREAMING_PLATFORMS.some(platform =>
          typeof platform.url === "string"
            ? domain.includes(getDomainNameFromUrl(platform.url))
            : platform.url.some(url => domain.includes(getDomainNameFromUrl(url))),
        );

        // For demonstration, randomly distribute time across hours
        // In a real app, you would use actual timestamps from visit data
        const timeInMinutes = Math.round(site.timeSpent / 60);
        const hourOfVisit = Math.floor(Math.random() * 24); // Simulating hour distribution
        const hour = hourOfVisit.toString();

        if (isSocial) {
          hourlyData[hour].social += timeInMinutes;
        }
        else if (isStreaming) {
          hourlyData[hour].streaming += timeInMinutes;
        }
        else {
          hourlyData[hour].others += timeInMinutes;
        }
      });

      // Convert to chart data format
      const formattedData = Object.entries(hourlyData)
        .map(([hour, data]) => ({
          hour,
          social: data.social,
          streaming: data.streaming,
          others: data.others,
        }))
        .sort((a, b) => Number.parseInt(a.hour) - Number.parseInt(b.hour));

      setChartData(formattedData);
      console.log(formattedData);
    });
  }, []);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Usage by Hour</CardTitle>
        <CardDescription>
          Time spent on different platforms throughout the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const hour = Number.parseInt(value);
                return hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={value => `${value}m`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="social"
              type="monotone"
              fill="#4f46e5"
              fillOpacity={0.4}
              stroke="#4f46e5"
              stackId="a"
              name="Social Media"
            />
            <Area
              dataKey="streaming"
              type="monotone"
              fill="#ec4899"
              fillOpacity={0.4}
              stroke="#ec4899"
              stackId="a"
              name="Streaming"
            />
            <Area
              dataKey="others"
              type="monotone"
              fill="#10b981"
              fillOpacity={0.4}
              stroke="#10b981"
              stackId="a"
              name="Others"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Platform usage by hour of day
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last 24 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
