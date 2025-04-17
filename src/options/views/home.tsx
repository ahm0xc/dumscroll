import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
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
        <TopWebsitesCard />
        <TopWebsitesCard />
      </div>
    </div>
  );
}

function TopWebsitesCard() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [chartConfig, setChartConfig] = React.useState<any>({});

  React.useEffect(() => {
    getUses()
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
              label: getWebsiteNameFromUrl(getUrlFromDomainName(identifier)),
              color: CHART_COLORS[index % CHART_COLORS.length],
            },
          ]))),
        };

        setChartData(INTERNAL__chartData);
        setChartConfig(INTERNAL__chartConfig);
      });
  }, []);

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
          <button type="button" className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ChevronLeftIcon className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-muted-foreground h-7 flex items-center justify-center">
            Today
          </span>
          <button type="button" className="h-7 w-7 rounded-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
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
                return label ? truncateString(label, 5, "..") : value;
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
