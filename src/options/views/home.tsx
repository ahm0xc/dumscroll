import React from "react";

import type { UsageStats } from "~/shared/utils";

import { cn } from "~/lib/utils";
import { BrainIcon } from "~/shared/icons";
import { getFaviconUrl, getUrlFromDomainName, getUses, getWebsiteNameFromUrl } from "~/shared/utils";

const CHART_COLORS = [
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#c2410c",
];

export default function HomeView() {
  return (
    <div>
      <header className="p-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm font-medium text-muted-foreground">
          View your most visited websites and focus mode statistics
        </p>
      </header>
      <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-6 max-w-7xl">
        <TopWebsitesCard className="lg:col-span-2" />
        <FocusModeCard />
      </div>
    </div>
  );
}

function TopWebsitesCard({ className }: { className?: string }) {
  const [timeRange, setTimeRange] = React.useState<"today" | "yesterday">("today");
  const [usesData, setUsesData] = React.useState<(UsageStats & { url: string; percent: number })[]>([]);

  const formatDuration = React.useCallback((duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m`;
    }
    return `${seconds}s`;
  }, []);

  React.useEffect(() => {
    const startDate = timeRange === "today" ? new Date() : new Date(new Date().setDate(new Date().getDate() - 1));
    const endDate = timeRange === "today" ? new Date() : new Date(new Date().setDate(new Date().getDate() - 1));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    getUses({ startDate, endDate }).then((data) => {
      const totalDuration = Object.values(data).reduce((acc, curr) => acc + curr.totalDuration, 0);
      setUsesData(Object.entries(data).map(([url, stats]) => ({
        url: getUrlFromDomainName(url),
        percent: stats.totalDuration / totalDuration,
        ...stats,
      })).sort((a, b) => b.percent - a.percent));
    });
  }, [timeRange]);

  const totalDuration = React.useMemo(() => {
    return usesData.reduce((acc, curr) => acc + curr.totalDuration, 0);
  }, [usesData]);

  return (
    <div aria-label="top-websites-card" className={cn("rounded-2xl border", className)}>
      <div aria-label="card-header" className="flex items-center justify-between px-4 py-4">
        <div className="flex gap-2 items-center">
          {/* <StarIcon className="size-5" /> */}
          <p className="text-lg font-medium">
            Your Usage
          </p>
        </div>
        <div className="flex bg-orange-100 p-1 rounded-full">
          <button type="button" className={cn("h-6 rounded-l-full flex items-center justify-center px-3  text-xs", timeRange === "today" && "bg-orange-500 text-white")} onClick={() => setTimeRange("today")}>Today</button>
          <button type="button" className={cn("h-6 rounded-r-full flex items-center justify-center px-3  text-xs", timeRange === "yesterday" && "bg-orange-500 text-white")} onClick={() => setTimeRange("yesterday")}>Yesterday</button>
        </div>
      </div>
      <div className="px-4">
        <p className="text-5xl font-semibold">
          {formatDuration(totalDuration).split(/([hms])/).map((part, i) =>
            /[hms]/.test(part) ? <span key={i} className="text-lg">{part}</span> : part
          )}
        </p>
      </div>
      <div aria-label="card-content" className="p-4">
        <p className="text-lg font-medium mb-4">Top websites</p>
        <div className="flex flex-col gap-4">
          {usesData.slice(0, 5).map((use) => (
            <div key={use.url} className="flex items-center gap-4">
              <div>
                <img src={getFaviconUrl(use.url)} alt={use.url} className="size-5 object-cover" />
              </div>
              <div className="flex-1 relative">
                <p className="text-sm font-medium absolute top-1/2 -translate-y-1/2 left-2">{getWebsiteNameFromUrl(use.url)}</p>
                <div className="h-8 rounded-sm" style={{ background: CHART_COLORS[2], width: `${use.percent * 100}%` }} />
              </div>
              <div>
                <p className="text-sm font-medium">{formatDuration(use.totalDuration)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FocusModeCard({ className }: { className?: string }) {
  return (
    <div aria-label="focus-mode-card" className={cn("rounded-2xl border p-4 space-y-4 h-fit", className)}>
      <div aria-label="card-header" className="flex justify-center items-center">
        <p className="text-lg font-medium">Quick Actions</p>
      </div>
      <div aria-label="card-content" className="flex flex-col gap-4">
        <button type="button" className="w-[80%] aspect-square h-auto rounded-full mx-auto flex items-center justify-center border-2 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors">
          <BrainIcon className="size-20 text-orange-600" />
        </button>
      </div>
    </div >
  )
}

// function UsesChartCard({ className }: { className?: string }) {
//   const [chartData, setChartData] = React.useState<any[]>([]);
//   const [chartConfig, setChartConfig] = React.useState<any>({});
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [timeRange, setTimeRange] = React.useState<"7days" | "30days">("7days");
//   const [isPremium, _setIsPremium] = React.useState(false); // This would normally come from your auth system

//   React.useEffect(() => {
//     async function fetchDailyData() {
//       setIsLoading(true);

//       // Number of days to fetch based on selected range
//       const daysToFetch = timeRange === "7days" ? 7 : 30;

//       // Create array of days
//       const days = [];
//       for (let i = daysToFetch - 1; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         days.push(date);
//       }

//       // Fetch data for each day individually
//       const dailyData = await Promise.all(
//         days.map(async (day) => {
//           // Create start and end time for the day (midnight to midnight)
//           const dayStart = new Date(day);
//           dayStart.setHours(0, 0, 0, 0);

//           const dayEnd = new Date(day);
//           dayEnd.setHours(23, 59, 59, 999);

//           // Fetch data for this specific day
//           const data = await getUses({ startDate: dayStart, endDate: dayEnd });

//           // Calculate total usage for the day (sum of all domains)
//           const totalUsage = Object.values(data).reduce((sum, stats) => sum + stats.totalDuration, 0);

//           return {
//             date: dayStart.toISOString().split("T")[0], // Format as YYYY-MM-DD
//             totalUses: totalUsage,
//             // Store all domains data for potential future breakdown
//             domains: Object.entries(data).map(([domain, stats]) => ({
//               domain,
//               duration: stats.totalDuration,
//               viewCount: stats.viewCount,
//             })),
//           };
//         }),
//       );

//       // Configure chart
//       const chartConfig = {
//         totalUses: {
//           label: "Total Usage (seconds)",
//           color: CHART_COLORS[0],
//         },
//       };

//       setChartData(dailyData);
//       setChartConfig(chartConfig);
//       setIsLoading(false);
//     }

//     fetchDailyData();
//   }, [timeRange]);

//   const handleTimeRangeChange = (value: string) => {
//     const newValue = value as "7days" | "30days";

//     // Only allow 30 days for premium users
//     if (newValue === "30days" && !isPremium) {
//       // Could show a premium upsell modal/tooltip here
//       return;
//     }

//     setTimeRange(newValue);
//   };

//   return (
//     <div aria-label="usage-analytics-card" className={cn("bg-neutral-50 dark:bg-neutral-900 rounded-xl border", className)}>
//       <div aria-label="card-header" className="h-11 flex items-center justify-between px-4 border-b">
//         <div className="flex gap-2 items-center">
//           <StarIcon className="w-4 h-4 text-muted-foreground" />
//           <p className="text-sm font-medium text-muted-foreground">
//             Usage Analytics
//           </p>
//         </div>
//         <div>
//           <Select
//             value={timeRange}
//             onValueChange={handleTimeRangeChange}
//           >
//             <SelectTrigger className="text-sm bg-transparent border rounded px-2 py-1 text-muted-foreground">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="7days">Last 7 Days</SelectItem>
//               <SelectItem value="30days" disabled={!isPremium}>
//                 <LockIcon className="size-3 inline-block mr-1" />
//                 Last 30 Days
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div aria-label="card-content" className="p-4">
//         {isLoading
//           ? (
//               <div className="flex items-center justify-center h-[250px]">
//                 <p className="text-sm text-muted-foreground">Loading data...</p>
//               </div>
//             )
//           : (
//               <ChartContainer
//                 config={chartConfig}
//                 className="aspect-auto h-[250px] w-full"
//               >
//                 <AreaChart data={chartData}>
//                   <defs>
//                     <linearGradient id="fillTotalUses" x1="0" y1="0" x2="0" y2="1">
//                       <stop
//                         offset="5%"
//                         stopColor={CHART_COLORS[0]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={CHART_COLORS[0]}
//                         stopOpacity={0.1}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid vertical={false} />
//                   <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     minTickGap={32}
//                     tickFormatter={(value) => {
//                       const date = new Date(value);
//                       return date.toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       });
//                     }}
//                   />
//                   <YAxis
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     tickFormatter={(value) => {
//                     // Format seconds to minutes if large enough
//                       if (value >= 60) {
//                         return `${Math.floor(value / 60)}m`;
//                       }
//                       return `${value}s`;
//                     }}
//                   />
//                   <ChartTooltip
//                     cursor={false}
//                     content={(
//                       <ChartTooltipContent
//                         labelFormatter={(value) => {
//                           return new Date(value).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                           });
//                         }}
//                         formatter={(value) => {
//                           const seconds = Number(value);
//                           if (seconds < 60)
//                             return `${seconds}s`;
//                           if (seconds < 3600)
//                             return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
//                           const hours = Math.floor(seconds / 3600);
//                           const minutes = Math.floor((seconds % 3600) / 60);
//                           return `${hours}h ${minutes}m`;
//                         }}
//                         indicator="dot"
//                       />
//                     )}
//                   />
//                   <Area
//                     dataKey="totalUses"
//                     type="monotone"
//                     fill="url(#fillTotalUses)"
//                     stroke={CHART_COLORS[0]}
//                     strokeWidth={2}
//                   />
//                   <ChartLegend content={<ChartLegendContent />} />
//                 </AreaChart>
//               </ChartContainer>
//             )}
//       </div>
//     </div>
//   );
// }

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
