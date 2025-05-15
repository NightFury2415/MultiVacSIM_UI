import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Users, Map, AlertTriangle, WormIcon as Virus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">HealthRoute AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-sm font-medium">
              Home
            </a>
            <a href="/dashboard" className="text-sm font-medium text-emerald-600">
              Dashboard
            </a>
            <a href="/simulation" className="text-sm font-medium">
              Simulation
            </a>
            <a href="/routes" className="text-sm font-medium">
              Routes
            </a>
            <a href="/about" className="text-sm font-medium">
              About
            </a>
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
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Disease Trends</CardTitle>
                    <CardDescription>COVID-19 and flu case trends over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center text-gray-500">
                      <p>Disease Trend Chart</p>
                      <p className="text-xs">(Chart visualization would be here)</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Regional Distribution</CardTitle>
                    <CardDescription>Case distribution by region</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center text-gray-500">
                      <p>Regional Distribution Chart</p>
                      <p className="text-xs">(Chart visualization would be here)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Optimized Resource Routes</CardTitle>
                    <CardDescription>AI-optimized routes for resource distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
                      <div className="text-center text-gray-500">
                        <Map className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                        <p>Google Maps Integration</p>
                        <p className="text-xs">(Map would be displayed here)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Performance</CardTitle>
                    <CardDescription>Reinforcement learning model metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center text-gray-500">
                      <p>AI Performance Metrics</p>
                      <p className="text-xs">(Performance visualization would be here)</p>
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
                <CardContent className="h-[500px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <p>COVID-19 Analysis Dashboard</p>
                    <p className="text-xs">(Detailed COVID-19 data would be displayed here)</p>
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
                <CardContent className="h-[500px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <p>Flu Analysis Dashboard</p>
                    <p className="text-xs">(Detailed flu data would be displayed here)</p>
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
                <CardContent className="h-[500px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <p>AI Model Performance Dashboard</p>
                    <p className="text-xs">(Detailed AI metrics would be displayed here)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
