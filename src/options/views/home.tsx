import { ChevronLeftIcon, ChevronRightIcon, LockIcon, StarIcon } from "lucide-react";
import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { getUrlFromDomainName, getUses, getWebsiteNameFromUrl, truncateString } from "~/shared/utils";

const CHART_COLORS = [
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
];

export default function HomeView() {
  return (
    <div>
      <header className="h-20 border-b border-border bg-zinc-50 dark:bg-neutral-900 w-full px-6 flex flex-col justify-center gap-0.5">
        <p className="text-sm font-medium text-muted-foreground">
          Dashboard
        </p>
        <h2 className="text-lg font-semibold">Uses Overview</h2>
      </header>
      <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
        <TopWebsitesCard />
        <UsesChartCard className="lg:col-span-3" />
      </div>
    </div>
  );
}

function TopWebsitesCard() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [chartConfig, setChartConfig] = React.useState<any>({});
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  const goToPreviousDay = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, []);

  const goToNextDay = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }, []);

  const formatDateForDisplay = React.useCallback((date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  }, []);

  React.useEffect(() => {
    currentDate.setHours(0, 0, 0, 0);
    getUses({ startDate: currentDate })
      .then((data) => {
        const INTERNAL__topWebsites = Object.entries(data)
          .sort(([, a], [, b]) => b.totalDuration - a.totalDuration)
          .slice(0, 5);
        const INTERNAL__chartData = INTERNAL__topWebsites.map(([identifier, stats], index) => ({
          identifier,
          duration: stats.totalDuration,
          fill: CHART_COLORS[index % CHART_COLORS.length],
        }));

        const INTERNAL__chartConfig = {
          visitors: {
            label: "Visitors",
          },
          ...Object.fromEntries(INTERNAL__topWebsites.map(([identifier], index) => ([
            identifier,
            {
              label: identifier,
              color: CHART_COLORS[index % CHART_COLORS.length],
            },
          ]))),
        };

        setChartData(INTERNAL__chartData);
        setChartConfig(INTERNAL__chartConfig);
      });
  }, [currentDate]);

  return (
    <div aria-label="top-websites-card" className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border">
      <div aria-label="card-header" className="h-11 flex items-center justify-between px-4 border-b">
        <div className="flex gap-2 items-center">
          <StarIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Top Websites
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={goToPreviousDay}
          >
            <ChevronLeftIcon className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-muted-foreground h-7 flex items-center justify-center w-[75px] font-mono">
            {formatDateForDisplay(currentDate)}
          </span>
          <button
            type="button"
            className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={goToNextDay}
          >
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div aria-label="card-content" className="p-4">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="identifier"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const label = chartConfig[value as keyof typeof chartConfig]?.label;
                return label ? truncateString(getWebsiteNameFromUrl(getUrlFromDomainName(label)), 5, "..") : value;
              }}
            />
            <XAxis dataKey="duration" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={(
                <ChartTooltipContent
                  formatter={(value) => {
                    const num = Number(value);
                    if (num < 60)
                      return `${num}s`;
                    if (num < 3600)
                      return `${Math.floor(num / 60)}m ${Math.floor(num % 60)}s`;
                    const hours = Math.floor(num / 3600);
                    const minutes = Math.floor((num % 3600) / 60);
                    return `${hours}h ${minutes}m`;
                  }}

                />
              )}
            />
            <Bar dataKey="duration" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function UsesChartCard({ className }: { className?: string }) {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [chartConfig, setChartConfig] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState<"7days" | "30days">("7days");
  const [isPremium, _setIsPremium] = React.useState(false); // This would normally come from your auth system

  React.useEffect(() => {
    async function fetchDailyData() {
      setIsLoading(true);

      // Number of days to fetch based on selected range
      const daysToFetch = timeRange === "7days" ? 7 : 30;

      // Create array of days
      const days = [];
      for (let i = daysToFetch - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date);
      }

      // Fetch data for each day individually
      const dailyData = await Promise.all(
        days.map(async (day) => {
          // Create start and end time for the day (midnight to midnight)
          const dayStart = new Date(day);
          dayStart.setHours(0, 0, 0, 0);

          const dayEnd = new Date(day);
          dayEnd.setHours(23, 59, 59, 999);

          // Fetch data for this specific day
          const data = await getUses({ startDate: dayStart, endDate: dayEnd });

          // Calculate total usage for the day (sum of all domains)
          const totalUsage = Object.values(data).reduce((sum, stats) => sum + stats.totalDuration, 0);

          return {
            date: dayStart.toISOString().split("T")[0], // Format as YYYY-MM-DD
            totalUses: totalUsage,
            // Store all domains data for potential future breakdown
            domains: Object.entries(data).map(([domain, stats]) => ({
              domain,
              duration: stats.totalDuration,
              viewCount: stats.viewCount,
            })),
          };
        }),
      );

      // Configure chart
      const chartConfig = {
        totalUses: {
          label: "Total Usage (seconds)",
          color: CHART_COLORS[0],
        },
      };

      setChartData(dailyData);
      setChartConfig(chartConfig);
      setIsLoading(false);
    }

    fetchDailyData();
  }, [timeRange]);

  const handleTimeRangeChange = (value: string) => {
    const newValue = value as "7days" | "30days";

    // Only allow 30 days for premium users
    if (newValue === "30days" && !isPremium) {
      // Could show a premium upsell modal/tooltip here
      return;
    }

    setTimeRange(newValue);
  };

  return (
    <div aria-label="usage-analytics-card" className={cn("bg-neutral-50 dark:bg-neutral-900 rounded-xl border", className)}>
      <div aria-label="card-header" className="h-11 flex items-center justify-between px-4 border-b">
        <div className="flex gap-2 items-center">
          <StarIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Usage Analytics
          </p>
        </div>
        <div>
          <Select
            value={timeRange}
            onValueChange={handleTimeRangeChange}
          >
            <SelectTrigger className="text-sm bg-transparent border rounded px-2 py-1 text-muted-foreground">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days" disabled={!isPremium}>
                <LockIcon className="size-3 inline-block mr-1" />
                Last 30 Days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div aria-label="card-content" className="p-4">
        {isLoading
          ? (
              <div className="flex items-center justify-center h-[250px]">
                <p className="text-sm text-muted-foreground">Loading data...</p>
              </div>
            )
          : (
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fillTotalUses" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={CHART_COLORS[0]}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={CHART_COLORS[0]}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                    // Format seconds to minutes if large enough
                      if (value >= 60) {
                        return `${Math.floor(value / 60)}m`;
                      }
                      return `${value}s`;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={(
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                        formatter={(value) => {
                          const seconds = Number(value);
                          if (seconds < 60)
                            return `${seconds}s`;
                          if (seconds < 3600)
                            return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
                          const hours = Math.floor(seconds / 3600);
                          const minutes = Math.floor((seconds % 3600) / 60);
                          return `${hours}h ${minutes}m`;
                        }}
                        indicator="dot"
                      />
                    )}
                  />
                  <Area
                    dataKey="totalUses"
                    type="monotone"
                    fill="url(#fillTotalUses)"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            )}
      </div>
    </div>
  );
}

// function UsesRadarChartCard() {
//   const [chartData, setChartData] = React.useState<any[]>([]);
//   const [chartConfig, setChartConfig] = React.useState<any>({});
//   const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

//   const goToPreviousDay = React.useCallback(() => {
//     setCurrentDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setDate(newDate.getDate() - 1);
//       return newDate;
//     });
//   }, []);

//   const goToNextDay = React.useCallback(() => {
//     setCurrentDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setDate(newDate.getDate() + 1);
//       return newDate;
//     });
//   }, []);

//   const formatDateForDisplay = React.useCallback((date: Date) => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) {
//       return "Today";
//     }
//     else if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday";
//     }
//     else {
//       return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//     }
//   }, []);

//   React.useEffect(() => {
//     currentDate.setHours(0, 0, 0, 0);
//     getUses({ startDate: currentDate })
//       .then((_) => {
//         // Generate hourly data for all 24 hours
//         const hourlyData = Array.from({ length: 24 }, (_, i) => {
//           const hour = i % 12 || 12;
//           const ampm = i < 12 ? "AM" : "PM";
//           return {
//             hour: `${hour} ${ampm}`,
//             duration: Math.floor(Math.random() * 300) + 100, // Sample data - replace with actual data processing
//           };
//         });

//         const chartConfig = {
//           duration: {
//             label: "Duration",
//             color: "hsl(var(--chart-2))",
//           },
//         };

//         setChartData(hourlyData);
//         setChartConfig(chartConfig);
//       });
//   }, [currentDate]);

//   return (
//     <div aria-label="top-websites-card" className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border">
//       <div aria-label="card-header" className="h-11 flex items-center justify-between px-4 border-b">
//         <div className="flex gap-2 items-center">
//           <StarIcon className="w-4 h-4 text-muted-foreground" />
//           <p className="text-sm font-medium text-muted-foreground">
//             Hourly Usage
//           </p>
//         </div>
//         <div className="flex gap-2 items-center">
//           <button
//             type="button"
//             className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//             onClick={goToPreviousDay}
//           >
//             <ChevronLeftIcon className="w-4 h-4 text-muted-foreground" />
//           </button>
//           <span className="text-sm font-medium text-muted-foreground h-7 flex items-center justify-center w-[75px] font-mono">
//             {formatDateForDisplay(currentDate)}
//           </span>
//           <button
//             type="button"
//             className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//             onClick={goToNextDay}
//           >
//             <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
//           </button>
//         </div>
//       </div>
//       <div aria-label="card-content" className="p-4">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <RadarChart data={chartData}>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <PolarAngleAxis dataKey="hour" />
//             <PolarGrid />
//             <Radar
//               dataKey="duration"
//               fill="var(--color-duration)"
//               fillOpacity={0.6}
//             />
//           </RadarChart>
//         </ChartContainer>
//       </div>
//     </div>
//   );
// }
