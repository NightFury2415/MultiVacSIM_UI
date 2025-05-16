"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCSVData, processDataForCharts, dataUrls } from "@/lib/data-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIPerformanceMetrics() {
  const [covidData, setCovidData] = useState<any[]>([])
  const [fluData, setFluData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        // Fetch COVID data
        const covidRawData = await fetchCSVData(dataUrls.covidRawNational)
        const covidNormalizedData = await fetchCSVData(dataUrls.covidNormalizedNational)

        // Fetch Flu data
        const fluRawData = await fetchCSVData(dataUrls.fluRawNational)
        const fluNormalizedData = await fetchCSVData(dataUrls.fluNormalizedNational)

        // Process data for charts
        setCovidData({
          raw: processDataForCharts(covidRawData),
          normalized: processDataForCharts(covidNormalizedData),
        })

        setFluData({
          raw: processDataForCharts(fluRawData),
          normalized: processDataForCharts(fluNormalizedData),
        })
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // If data is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Training Reward Curves</CardTitle>
            <CardDescription>Loading reinforcement learning metrics...</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading data...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="covid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="covid">COVID-19 Model</TabsTrigger>
          <TabsTrigger value="flu">Flu Model</TabsTrigger>
        </TabsList>

        <TabsContent value="covid" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>COVID-19 Training Reward Curve</CardTitle>
              <CardDescription>Reinforcement learning reward progression over training episodes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "Episode Reward",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={covidData.raw} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                      name="Episode Reward"
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>COVID-19 Model Performance</CardTitle>
              <CardDescription>Normalized rewards and loss metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "Normalized Reward",
                    color: "hsl(var(--chart-2))",
                  },
                  loss: {
                    label: "Loss",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={covidData.normalized} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                      name="Normalized Reward"
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

        <TabsContent value="flu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flu Training Reward Curve</CardTitle>
              <CardDescription>Reinforcement learning reward progression over training episodes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "Episode Reward",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fluData.raw} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                      name="Episode Reward"
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Flu Model Performance</CardTitle>
              <CardDescription>Normalized rewards and loss metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reward: {
                    label: "Normalized Reward",
                    color: "hsl(var(--chart-2))",
                  },
                  loss: {
                    label: "Loss",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fluData.normalized} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                      name="Normalized Reward"
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
