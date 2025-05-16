"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for regional distribution
const regionalData = [
  { region: "North", covid: 4500, flu: 3200, vaccination: 72 },
  { region: "South", covid: 6200, flu: 4100, vaccination: 68 },
  { region: "East", covid: 3800, flu: 2900, vaccination: 75 },
  { region: "West", covid: 5100, flu: 3600, vaccination: 79 },
  { region: "Central", covid: 4200, flu: 3100, vaccination: 71 },
]

export default function RegionalDistributionChart() {
  return (
    <ChartContainer
      config={{
        covid: {
          label: "COVID-19 Cases",
          color: "hsl(var(--chart-1))",
        },
        flu: {
          label: "Flu Cases",
          color: "hsl(var(--chart-2))",
        },
        vaccination: {
          label: "Vaccination Rate (%)",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar yAxisId="left" dataKey="covid" fill="var(--color-covid)" name="COVID-19 Cases" />
          <Bar yAxisId="left" dataKey="flu" fill="var(--color-flu)" name="Flu Cases" />
          <Bar yAxisId="right" dataKey="vaccination" fill="var(--color-vaccination)" name="Vaccination Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
