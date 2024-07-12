"use client";

import { PartyPopperIcon } from "lucide-react";
import React from "react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartData = [{ browser: "saved", hours: 1.4, fill: "var(--color-saved)" }];

const chartConfig = {
  hours: {
    label: "Hours",
  },
  saved: {
    label: "Saved",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TimeSaved() {
  return (
      <Card className="border-none rounded-[inherit] h-full">
        <CardHeader className="p-4">
          <CardTitle className="text-center text-xl">Time Saved</CardTitle>
          <CardDescription className="text-center text-sm">Total time saved by Dumscroll</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <div>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={250}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="hours" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chartData[0]?.hours.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Hours Saved
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-center w-full">
            {/* <p className="text-sm flex items-center gap-1 justify-center">
              Saved 1.5 hours <PartyPopperIcon size={16} />
            </p> */}
            <p className="text-foreground/60 text-center text-[13px]">
              Showing results total hours saved today by Dumscroll
            </p>
          </div>
        </CardFooter>
      </Card>
  );
}
