"use client";

import * as React from "react";
import dayjs from "dayjs";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  youtube: {
    label: "Youtube",
    color: "hsl(var(--chart-5))",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-1))",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface UsesChartProps {
  chartData: Array<{ date: string; youtube: number; instagram: number; facebook: number }>;
}

export default function UsesChart({ chartData }: UsesChartProps) {
  const [timeRange, setTimeRange] = React.useState("30");

  const filteredData = chartData.filter((item) => {
    const today = dayjs();
    const ranged = today.subtract(Number.parseInt(timeRange), "day");

    const itemDate = dayjs(item.date);
    itemDate.isAfter(ranged) && itemDate.isBefore(today);
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Uses Analytics Graph</CardTitle>
          <CardDescription>Get an analytics of your daily uses of websites, watch.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillYoutube" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-youtube)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-youtube)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillFacebook" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-facebook)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-facebook)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-instagram)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-instagram)" stopOpacity={0.1} />
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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  // @ts-ignore
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="facebook"
              type="natural"
              fill="url(#fillFacebook)"
              stroke="var(--color-facebook)"
              stackId="a"
            />
            <Area
              dataKey="youtube"
              type="natural"
              fill="url(#fillYoutube)"
              stroke="var(--color-youtube)"
              stackId="a"
            />
            <Area
              dataKey="instagram"
              type="natural"
              fill="url(#fillInstagram)"
              stroke="var(--color-instagram)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
