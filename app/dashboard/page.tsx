import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, AlertTriangle, WormIcon as Virus } from "lucide-react"
import Link from "next/link"
import DiseaseTrendChart from "@/components/disease-trend-chart"
import RegionalDistributionChart from "@/components/regional-distribution-chart"
import AIPerformanceMetrics from "@/components/ai-performance-metrics"
import GoogleMapComponent from "@/components/google-map-component"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/images/ai-robot.png" alt="AI Robot" className="h-10 w-10" />
            <span className="text-xl font-bold">MultiVacSIM</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-emerald-600">
              Dashboard
            </Link>
            <Link href="/simulation" className="text-sm font-medium">
              Simulation
            </Link>
            <Link href="/routes" className="text-sm font-medium">
              Routes
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">
              Monitor COVID-19 and flu data, view optimized routes, and track reinforcement learning progress.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active COVID-19 Cases</CardTitle>
                <Virus className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <p className="text-xs text-gray-500">+2.5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Flu Cases</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,765</div>
                <p className="text-xs text-gray-500">-1.2% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vaccination Rate</CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.3%</div>
                <p className="text-xs text-gray-500">+0.8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Model Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-gray-500">+1.5% from last version</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="covid">COVID-19</TabsTrigger>
              <TabsTrigger value="flu">Flu</TabsTrigger>
              <TabsTrigger value="ai">AI Models</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Disease Trends</CardTitle>
                    <CardDescription>COVID-19 and flu case trends over the past 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DiseaseTrendChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Regional Distribution</CardTitle>
                    <CardDescription>Case distribution by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RegionalDistributionChart />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Optimized Resource Routes</CardTitle>
                    <CardDescription>AI-optimized routes for vaccine distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] relative">
                    <GoogleMapComponent routeType="all" region="all" optimizationPriority="balanced" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Performance</CardTitle>
                    <CardDescription>Reinforcement learning model metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] overflow-y-auto pr-2">
                      <AIPerformanceMetrics />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="covid" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>COVID-19 Detailed Analysis</CardTitle>
                  <CardDescription>Comprehensive data on COVID-19 cases, trends, and predictions</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                    <Card className="border-0 shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base">COVID-19 Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DiseaseTrendChart />
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base">Regional Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RegionalDistributionChart />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="flu" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Flu Detailed Analysis</CardTitle>
                  <CardDescription>Comprehensive data on flu cases, trends, and predictions</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                    <Card className="border-0 shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base">Flu Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DiseaseTrendChart />
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base">Regional Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RegionalDistributionChart />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Performance</CardTitle>
                  <CardDescription>Detailed metrics on reinforcement learning model performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIPerformanceMetrics />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
