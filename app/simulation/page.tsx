import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Play, Pause, RotateCcw, Save, Brain, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SimulationPage() {
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
            <a href="/dashboard" className="text-sm font-medium">
              Dashboard
            </a>
            <a href="/simulation" className="text-sm font-medium text-emerald-600">
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
            <h1 className="text-3xl font-bold tracking-tight">Reinforcement Learning Simulation</h1>
            <p className="text-gray-500">
              Run simulations to train and test reinforcement learning models for disease management strategies.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Version</CardTitle>
                <Brain className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">v3.2.1</div>
                <p className="text-xs text-gray-500">Latest reinforcement learning model</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Iterations</CardTitle>
                <Settings className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,458</div>
                <p className="text-xs text-gray-500">Total training iterations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-gray-500">Current model accuracy</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Simulations Run</CardTitle>
                <Play className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">347</div>
                <p className="text-xs text-gray-500">Total simulations completed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Simulation Controls</CardTitle>
                <CardDescription>Configure and run simulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scenario</label>
                    <Select defaultValue="combined">
                      <SelectTrigger>
                        <SelectValue placeholder="Select scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="covid">COVID-19 Only</SelectItem>
                        <SelectItem value="flu">Flu Only</SelectItem>
                        <SelectItem value="combined">Combined Scenario</SelectItem>
                        <SelectItem value="custom">Custom Scenario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="north">North Region</SelectItem>
                        <SelectItem value="south">South Region</SelectItem>
                        <SelectItem value="east">East Region</SelectItem>
                        <SelectItem value="west">West Region</SelectItem>
                        <SelectItem value="central">Central Region</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Population Density</label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Initial Infection Rate</label>
                    <Slider defaultValue={[5]} max={30} step={0.1} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vaccination Rate</label>
                    <Slider defaultValue={[70]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resource Constraints</label>
                    <Slider defaultValue={[30]} max={100} step={1} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="advanced-mode" />
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                    <Button variant="outline">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Simulation Visualization</CardTitle>
                <CardDescription>Real-time visualization of the reinforcement learning simulation</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center text-gray-500">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-emerald-500 opacity-50" />
                  <p className="text-lg font-medium">Simulation Visualization</p>
                  <p className="text-sm">(Reinforcement learning simulation would be displayed here)</p>
                  <p className="text-xs mt-2">Configure parameters and click Run to start the simulation</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">Simulation time: 00:00:00</div>
                <Button variant="outline" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Results
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="results" className="space-y-4">
            <TabsList>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="routes">Optimized Routes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Results</CardTitle>
                  <CardDescription>Outcomes and insights from the reinforcement learning simulation</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <p>Simulation Results Dashboard</p>
                    <p className="text-xs">(Results would be displayed here after running a simulation)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for the reinforcement learning model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Model Accuracy</label>
                        <span className="text-sm text-emerald-600">94.2%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94.2%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Resource Efficiency</label>
                        <span className="text-sm text-emerald-600">87.5%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "87.5%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Route Optimization</label>
                        <span className="text-sm text-emerald-600">92.1%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92.1%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Infection Reduction</label>
                        <span className="text-sm text-emerald-600">78.3%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78.3%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Coverage Effectiveness</label>
                        <span className="text-sm text-emerald-600">89.7%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "89.7%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Optimized Routes</CardTitle>
                  <CardDescription>Routes generated by the reinforcement learning model</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <p>Optimized Routes Map</p>
                    <p className="text-xs">(Google Maps visualization would be displayed here)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation History</CardTitle>
                  <CardDescription>Record of previous simulation runs and their outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-gray-50 p-3 text-sm font-medium">
                      <div>Simulation ID</div>
                      <div>Scenario</div>
                      <div>Date</div>
                      <div>Accuracy</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-5 p-3 text-sm">
                          <div>SIM-{10000 - i}</div>
                          <div>{["Combined", "COVID-19", "Flu", "Custom", "Combined"][i]}</div>
                          <div>{`${5 - i} ${i === 0 ? "hour" : "days"} ago`}</div>
                          <div>{94 - i * 0.2}%</div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                i === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {i === 0 ? "Current" : "Archived"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
