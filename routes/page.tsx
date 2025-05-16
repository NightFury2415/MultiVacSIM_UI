"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, MapIcon, Truck, Hospital, Syringe, AlertCircle } from "lucide-react"
import GoogleMapComponent from "@/components/google-map"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"

export default function RoutesPage() {
  const [apiKeyAvailable, setApiKeyAvailable] = useState(true)
  const [routeType, setRouteType] = useState("all")
  const [region, setRegion] = useState("all")
  const [optimizationPriority, setOptimizationPriority] = useState("balanced")
  const [appliedFilters, setAppliedFilters] = useState({
    routeType: "all",
    region: "all",
    optimizationPriority: "balanced",
  })
  const [routeData, setRouteData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    setApiKeyAvailable(!!apiKey)

    // Log for debugging
    if (!apiKey) {
      console.warn("Google Maps API key is not set in environment variables")
    } else {
      console.log("Google Maps API key is available")
    }

    // Initial data fetch
    fetchRouteData("all", "all", "balanced")
  }, [])

  // Fetch route data from API
  const fetchRouteData = async (type: string, region: string, priority: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/routes?type=${type}&region=${region}&priority=${priority}`)
      const data = await response.json()

      if (data.routes) {
        setRouteData(data.routes)
      } else {
        console.error("No routes data returned from API")
        setRouteData([])
      }
    } catch (error) {
      console.error("Error fetching route data:", error)
      setRouteData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({
      routeType,
      region,
      optimizationPriority,
    })
    fetchRouteData(routeType, region, optimizationPriority)
  }

  // Reset filters
  const handleResetFilters = () => {
    setRouteType("all")
    setRegion("all")
    setOptimizationPriority("balanced")
    setAppliedFilters({
      routeType: "all",
      region: "all",
      optimizationPriority: "balanced",
    })
    fetchRouteData("all", "all", "balanced")
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // If tab is not "all", update the route type filter
    if (value !== "all") {
      setRouteType(value)
      setAppliedFilters({
        ...appliedFilters,
        routeType: value,
      })
      fetchRouteData(value, appliedFilters.region, appliedFilters.optimizationPriority)
    } else {
      setRouteType("all")
      setAppliedFilters({
        ...appliedFilters,
        routeType: "all",
      })
      fetchRouteData("all", appliedFilters.region, appliedFilters.optimizationPriority)
    }
  }

  // Filter route data based on active tab
  const getFilteredRouteData = () => {
    if (activeTab === "all") {
      return routeData
    }
    return routeData.filter((route) => route.type === activeTab)
  }

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
            <a href="/simulation" className="text-sm font-medium">
              Simulation
            </a>
            <a href="/routes" className="text-sm font-medium text-emerald-600">
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
            <h1 className="text-3xl font-bold tracking-tight">Route Optimization</h1>
            <p className="text-gray-500">
              View and manage AI-optimized routes for resource distribution, testing centers, and vaccination campaigns.
            </p>
          </div>

          {!apiKeyAvailable && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Required</AlertTitle>
              <AlertDescription>
                To see the actual Google Maps, please add your Google Maps API key to the environment variables. The
                environment variable should be named NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimized Routes</CardTitle>
                <Truck className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeData.filter((route) => route.type === "distribution").length || 24}
                </div>
                <p className="text-xs text-gray-500">Active distribution routes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Testing Centers</CardTitle>
                <Hospital className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeData.filter((route) => route.type === "testing").length || 42}
                </div>
                <p className="text-xs text-gray-500">Active testing locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vaccination Centers</CardTitle>
                <Syringe className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeData.filter((route) => route.type === "vaccination").length || 36}
                </div>
                <p className="text-xs text-gray-500">Active vaccination locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Route Efficiency</CardTitle>
                <MapIcon className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeData.length > 0
                    ? (routeData.reduce((sum, route) => sum + route.efficiency, 0) / routeData.length).toFixed(1)
                    : "87.3"}
                  %
                </div>
                <p className="text-xs text-gray-500">Average route optimization</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Route Controls</CardTitle>
                <CardDescription>Configure and filter route displays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Route Type</label>
                    <Select value={routeType} onValueChange={setRouteType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Routes</SelectItem>
                        <SelectItem value="distribution">Resource Distribution</SelectItem>
                        <SelectItem value="testing">Testing Centers</SelectItem>
                        <SelectItem value="vaccination">Vaccination Centers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select value={region} onValueChange={setRegion}>
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
                    <label className="text-sm font-medium">Optimization Priority</label>
                    <Select value={optimizationPriority} onValueChange={setOptimizationPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="speed">Speed</SelectItem>
                        <SelectItem value="coverage">Coverage</SelectItem>
                        <SelectItem value="efficiency">Resource Efficiency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleApplyFilters} disabled={isLoading}>
                    {isLoading ? "Applying..." : "Apply Filters"}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleResetFilters} disabled={isLoading}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>Google Maps visualization of optimized routes across the USA</CardDescription>
              </CardHeader>
              <CardContent className="h-[600px] p-0 relative">
                <GoogleMapComponent
                  routeType={appliedFilters.routeType}
                  region={appliedFilters.region}
                  optimizationPriority={appliedFilters.optimizationPriority}
                />
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Routes</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Optimized Routes</CardTitle>
                  <CardDescription>Complete list of all routes optimized by our AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-gray-50 p-3 text-sm font-medium">
                      <div>Route ID</div>
                      <div>Type</div>
                      <div>Region</div>
                      <div>Efficiency</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        <div className="p-4 text-center">Loading route data...</div>
                      ) : getFilteredRouteData().length > 0 ? (
                        getFilteredRouteData().map((route, i) => (
                          <div key={route.id || i} className="grid grid-cols-5 p-3 text-sm">
                            <div>{route.id || `RT-${1000 + i}`}</div>
                            <div>{route.type || ["Distribution", "Testing", "Vaccination"][i % 3]}</div>
                            <div>{route.region || ["North", "South", "East", "West", "Central"][i % 5]}</div>
                            <div>{route.efficiency?.toFixed(1) || (85 + (i % 10)).toFixed(1)}%</div>
                            <div>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  route.status === "Active" || i % 3 === 0
                                    ? "bg-green-100 text-green-800"
                                    : route.status === "Pending" || i % 3 === 1
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {route.status || (i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Planning")}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center">No routes found matching the current filters.</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="distribution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Distribution Routes</CardTitle>
                  <CardDescription>Routes optimized for resource distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-gray-50 p-3 text-sm font-medium">
                      <div>Route ID</div>
                      <div>Resources</div>
                      <div>Region</div>
                      <div>Efficiency</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        <div className="p-4 text-center">Loading route data...</div>
                      ) : getFilteredRouteData().length > 0 ? (
                        getFilteredRouteData().map((route, i) => (
                          <div key={route.id || i} className="grid grid-cols-5 p-3 text-sm">
                            <div>{route.id || `DR-${2000 + i}`}</div>
                            <div>{route.subtype || ["Medical Supplies", "PPE", "Test Kits"][i % 3]}</div>
                            <div>{route.region || ["North", "Central", "West"][i % 3]}</div>
                            <div>{route.efficiency?.toFixed(1) || (88 + i).toFixed(1)}%</div>
                            <div>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                {route.status || "Active"}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center">
                          No distribution routes found matching the current filters.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Testing Center Routes</CardTitle>
                  <CardDescription>Routes optimized for testing centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-gray-50 p-3 text-sm font-medium">
                      <div>Route ID</div>
                      <div>Center Type</div>
                      <div>Region</div>
                      <div>Efficiency</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        <div className="p-4 text-center">Loading route data...</div>
                      ) : getFilteredRouteData().length > 0 ? (
                        getFilteredRouteData().map((route, i) => (
                          <div key={route.id || i} className="grid grid-cols-5 p-3 text-sm">
                            <div>{route.id || `TR-${3000 + i}`}</div>
                            <div>{route.subtype || ["Drive-through", "Walk-in", "Mobile"][i % 3]}</div>
                            <div>{route.region || ["South", "East", "Central"][i % 3]}</div>
                            <div>{route.efficiency?.toFixed(1) || (86 + i).toFixed(1)}%</div>
                            <div>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  route.status === "Active" || i === 0
                                    ? "bg-green-100 text-green-800"
                                    : route.status === "Pending" || i === 1
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {route.status || (i === 0 ? "Active" : i === 1 ? "Pending" : "Planning")}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center">No testing routes found matching the current filters.</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vaccination" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Center Routes</CardTitle>
                  <CardDescription>Routes optimized for vaccination centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-gray-50 p-3 text-sm font-medium">
                      <div>Route ID</div>
                      <div>Vaccine Type</div>
                      <div>Region</div>
                      <div>Efficiency</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        <div className="p-4 text-center">Loading route data...</div>
                      ) : getFilteredRouteData().length > 0 ? (
                        getFilteredRouteData().map((route, i) => (
                          <div key={route.id || i} className="grid grid-cols-5 p-3 text-sm">
                            <div>{route.id || `VR-${4000 + i}`}</div>
                            <div>{route.subtype || ["COVID-19", "Flu", "Combined"][i % 3]}</div>
                            <div>{route.region || ["West", "North", "South"][i % 3]}</div>
                            <div>{route.efficiency?.toFixed(1) || (87 + i).toFixed(1)}%</div>
                            <div>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  route.status === "Active" || i === 0 || i === 1
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {route.status || (i === 0 || i === 1 ? "Active" : "Planning")}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center">No vaccination routes found matching the current filters.</div>
                      )}
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
