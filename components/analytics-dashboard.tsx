"use client"

import { Tooltip } from "@/components/ui/tooltip"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchCSVData, processDataForCharts, dataUrls } from "@/lib/data-utils"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export default function AnalyticsDashboard() {
  const [covidStateData, setCovidStateData] = useState<any[]>([])
  const [fluRegionalData, setFluRegionalData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        // Fetch state/regional data
        const covidStateRewards = await fetchCSVData(dataUrls.covidNormalizedState)
        const fluRegionalRewards = await fetchCSVData(dataUrls.fluNormalizedRegional)

        // Process data for charts
        setCovidStateData(processDataForCharts(covidStateRewards, 5))
        setFluRegionalData(processDataForCharts(fluRegionalRewards, 5))
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Generate regional comparison data
  const generateRegionalData = () => {
    const regions = ["Northeast", "Southeast", "Midwest", "Southwest", "West"]
    return regions.map((region) => {
      const covidValue = Math.floor(180 + Math.random() * 100)
      const fluValue = Math.floor(150 + Math.random() * 100)
      return {
        region,
        covid: covidValue,
        flu: fluValue,
        efficiency: Math.floor(70 + Math.random() * 20),
      }
    })
  }

  const regionalComparisonData = generateRegionalData()

  // If data is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Loading analytics data...</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading data...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Comparison</CardTitle>
          <CardDescription>COVID-19 vs Flu distribution efficiency by region</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              covid: {
                label: "COVID-19 Reward",
                color: "hsl(var(--chart-1))",
              },
              flu: {
                label: "Flu Reward",
                color: "hsl(var(--chart-2))",
              },
              efficiency: {
                label: "Distribution Efficiency (%)",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="covid" fill="var(--color-covid)" name="COVID-19 Reward" />
                <Bar yAxisId="left" dataKey="flu" fill="var(--color-flu)" name="Flu Reward" />
                <Bar
                  yAxisId="right"
                  dataKey="efficiency"
                  fill="var(--color-efficiency)"
                  name="Distribution Efficiency (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="covid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="covid">COVID-19 State Analysis</TabsTrigger>
          <TabsTrigger value="flu">Flu Regional Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="covid" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>COVID-19 State-Level Rewards</CardTitle>
              <CardDescription>Normalized rewards by state over training episodes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "State Reward",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={covidStateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="episode" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="reward"
                      stroke="var(--color-reward)"
                      strokeWidth={2}
                      name="State Reward"
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flu Regional-Level Performance</CardTitle>
              <CardDescription>Normalized rewards and loss by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "Regional Reward",
                    color: "hsl(var(--chart-2))",
                  },
                  loss: {
                    label: "Loss",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fluRegionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="episode" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="reward"
                      stroke="var(--color-reward)"
                      strokeWidth={2}
                      name="Regional Reward"
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="loss"
                      stroke="var(--color-loss)"
                      strokeWidth={2}
                      name="Loss"
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
