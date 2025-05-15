import { NextResponse } from "next/server"
import { usaStates } from "@/lib/usa-data"

// This is a more comprehensive API for route optimization
// In a real application, this would connect to a more sophisticated reinforcement learning model

type RouteParams = {
  type: string
  region: string
  optimizationPriority: string
}

type Route = {
  id: string
  type: string
  subtype: string
  region: string
  efficiency: number
  status: string
  path: { lat: number; lng: number }[]
  locations: { lat: number; lng: number; title: string }[]
}

// Generate optimized routes based on parameters
function generateOptimizedRoutes(params: RouteParams): Route[] {
  const routes: Route[] = []

  // Define route types and their subtypes
  const routeTypes: Record<string, string[]> = {
    distribution: ["Medical Supplies", "PPE", "Test Kits", "Vaccines", "Ventilators", "Oxygen Tanks"],
    testing: ["Drive-through", "Walk-in", "Mobile", "Hospital-based", "Community Center", "School-based"],
    vaccination: ["COVID-19", "Flu", "Combined", "Mobile", "Pediatric", "Senior-focused"],
  }

  // Define regions and filter based on params
  const regions = params.region === "all" ? ["North", "South", "East", "West", "Central"] : [params.region]

  // Define statuses
  const statuses = ["Active", "Pending", "Planning"]

  // Base efficiency based on optimization priority
  let baseEfficiency = 80
  switch (params.optimizationPriority) {
    case "speed":
      baseEfficiency = 85
      break
    case "coverage":
      baseEfficiency = 82
      break
    case "efficiency":
      baseEfficiency = 88
      break
    default: // balanced
      baseEfficiency = 84
      break
  }

  // Generate routes based on type
  const types = params.type === "all" ? ["distribution", "testing", "vaccination"] : [params.type]

  let routeId = 1000

  types.forEach((type) => {
    const subtypes = routeTypes[type]

    regions.forEach((region) => {
      // Get states for this region
      const regionStates = usaStates.filter((state) => state.region.toLowerCase() === region.toLowerCase())

      if (regionStates.length === 0) {
        return
      }

      // Generate 2-4 routes per region per type
      const numRoutes = 2 + Math.floor(Math.random() * 3)

      for (let i = 0; i < numRoutes; i++) {
        const subtype = subtypes[Math.floor(Math.random() * subtypes.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]

        // Calculate efficiency with some randomness
        const efficiency = Math.min(98, baseEfficiency + Math.random() * 10)

        // Generate route ID based on type
        const prefix = type === "distribution" ? "DR" : type === "testing" ? "TR" : "VR"

        // Select 3-6 random states from the region for the route
        const routeStates = [...regionStates]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 + Math.floor(Math.random() * 4))

        // Create path from state coordinates
        const path = routeStates.map((state) => ({ lat: state.lat, lng: state.lng }))

        // Create locations (slightly offset from the path points for visual distinction)
        const locations = routeStates.map((state) => ({
          lat: state.lat + (Math.random() - 0.5) * 0.5,
          lng: state.lng + (Math.random() - 0.5) * 0.5,
          title: `${state.name} ${type === "distribution" ? "Distribution Center" : type === "testing" ? "Testing Center" : "Vaccination Center"}`,
        }))

        routes.push({
          id: `${prefix}-${routeId++}`,
          type,
          subtype,
          region,
          efficiency: Number.parseFloat(efficiency.toFixed(1)),
          status,
          path,
          locations,
        })
      }
    })
  })

  return routes
}

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "all"
  const region = searchParams.get("region") || "all"
  const optimizationPriority = searchParams.get("priority") || "balanced"

  try {
    // Add a small delay to simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate optimized routes
    const routes = generateOptimizedRoutes({
      type,
      region,
      optimizationPriority,
    })

    // Return the routes
    return NextResponse.json({ routes })
  } catch (error) {
    console.error("Error generating routes:", error)
    return NextResponse.json({ error: "Failed to generate routes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const params: RouteParams = await request.json()

    // Add a small delay to simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate optimized routes
    const routes = generateOptimizedRoutes(params)

    // Return the routes
    return NextResponse.json({ routes })
  } catch (error) {
    console.error("Error generating routes:", error)
    return NextResponse.json({ error: "Failed to generate routes" }, { status: 500 })
  }
}
