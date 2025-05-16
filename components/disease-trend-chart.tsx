"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for disease trends
const diseaseTrendData = [
  { date: "2023-01", covid: 12500, flu: 8700 },
  { date: "2023-02", covid: 11200, flu: 9500 },
  { date: "2023-03", covid: 9800, flu: 10200 },
  { date: "2023-04", covid: 8500, flu: 8900 },
  { date: "2023-05", covid: 7200, flu: 7100 },
  { date: "2023-06", covid: 6500, flu: 5200 },
  { date: "2023-07", covid: 7800, flu: 4100 },
  { date: "2023-08", covid: 9200, flu: 3800 },
  { date: "2023-09", covid: 10500, flu: 5600 },
  { date: "2023-10", covid: 11800, flu: 7900 },
  { date: "2023-11", covid: 13200, flu: 9800 },
  { date: "2023-12", covid: 14500, flu: 11200 },
]

export default function DiseaseTrendChart() {
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
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={diseaseTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="covid" stroke="var(--color-covid)" strokeWidth={2} name="COVID-19 Cases" />
          <Line type="monotone" dataKey="flu" stroke="var(--color-flu)" strokeWidth={2} name="Flu Cases" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
