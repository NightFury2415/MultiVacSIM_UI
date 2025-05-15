import { NextResponse } from "next/server"
import { usaStates } from "@/lib/usa-data"

// This is a simplified API for route optimization
// In a real application, this would connect to a more sophisticated reinforcement learning model

type SimulationParams = {
  scenario: string
  region: string
  populationDensity: number
  initialInfectionRate: number
  vaccinationRate: number
  resourceConstraints: number
  advancedMode: boolean
}

type SimulationResult = {
  id: string
  accuracy: number
  resourceEfficiency: number
  routeOptimization: number
  infectionReduction: number
  coverageEffectiveness: number
  optimizedRoutes: Route[]
  metrics: Metric[]
}

type Route = {
  id: string
  type: string
  region: string
  efficiency: number
  status: string
  path: { lat: number; lng: number }[]
}

type Metric = {
  day: number
  activeCases: number
  newCases: number
  recoveredCases: number
  resourceUsage: number
}

// Simplified reinforcement learning simulation
function runSimulation(params: SimulationParams): SimulationResult {
  // Generate a unique ID for this simulation
  const id = `SIM-${Date.now().toString().slice(-5)}`

  // Calculate base accuracy based on parameters
  const baseAccuracy = 85 + (params.advancedMode ? 5 : 0)

  // Adjust accuracy based on vaccination rate and population density
  const vaccinationFactor = (params.vaccinationRate / 100) * 5
  const densityFactor = ((100 - params.populationDensity) / 100) * 3

  // Calculate final accuracy with some randomness
  const accuracy = Math.min(98, baseAccuracy + vaccinationFactor + densityFactor + Math.random() * 2)

  // Calculate other metrics
  const resourceEfficiency = Math.min(95, 75 + ((100 - params.resourceConstraints) / 100) * 15 + Math.random() * 5)
  const routeOptimization = Math.min(97, 80 + (params.vaccinationRate / 100) * 10 + Math.random() * 7)
  const infectionReduction = Math.min(90, 60 + (params.vaccinationRate / 100) * 20 + Math.random() * 10)
  const coverageEffectiveness = Math.min(
    95,
    75 + (params.vaccinationRate / 100) * 10 + ((100 - params.resourceConstraints) / 100) * 10,
  )

  // Generate sample optimized routes
  const optimizedRoutes = generateSampleRoutes(params.region, routeOptimization)

  // Generate daily metrics for a 30-day simulation
  const metrics = generateMetrics(params, 30)

  return {
    id,
    accuracy,
    resourceEfficiency,
    routeOptimization,
    infectionReduction,
    coverageEffectiveness,
    optimizedRoutes,
    metrics,
  }
}

// Generate sample routes for demonstration
function generateSampleRoutes(region: string, efficiency: number): Route[] {
  const routeTypes = ["Distribution", "Testing", "Vaccination"]
  const statuses = ["Active", "Pending", "Planning"]

  // Filter states by region if specified
  const filteredStates =
    region === "all" ? usaStates : usaStates.filter((state) => state.region.toLowerCase() === region.toLowerCase())

  const routes: Route[] = []

  // Generate 5-10 sample routes
  const numRoutes = 5 + Math.floor(Math.random() * 6)

  for (let i = 0; i < numRoutes; i++) {
    const routeType = routeTypes[i % routeTypes.length]
    const routeRegion = filteredStates.length > 0 ? filteredStates[i % filteredStates.length].region : "Central"
    const routeStatus = statuses[i % statuses.length]
    const routeEfficiency = Math.min(99, efficiency - 5 + Math.random() * 10)

    // Select 3-5 random states for the route path
    const routeStates = [...filteredStates].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3))

    // Create path from state coordinates
    const path = routeStates.map((state) => ({ lat: state.lat, lng: state.lng }))

    routes.push({
      id: `RT-${1000 + i}`,
      type: routeType,
      region: routeRegion,
      efficiency: Number.parseFloat(routeEfficiency.toFixed(1)),
      status: routeStatus,
      path,
    })
  }

  return routes
}

// Generate daily metrics for the simulation
function generateMetrics(params: SimulationParams, days: number): Metric[] {
  const metrics: Metric[] = []

  // Initial values
  let activeCases = params.initialInfectionRate * 1000
  let totalCases = activeCases
  let recoveredCases = 0
  let resourceUsage = 50

  // Factors affecting the spread
  const vaccinationFactor = 1 - (params.vaccinationRate / 100) * 0.8
  const densityFactor = (params.populationDensity / 100) * 1.5
  const resourceFactor = (params.resourceConstraints / 100) * 0.5

  for (let day = 1; day <= days; day++) {
    // Calculate new cases based on current active cases and factors
    const spreadRate = 0.2 * vaccinationFactor * densityFactor * resourceFactor
    const newCases = Math.floor(activeCases * spreadRate * (1 - day / (days * 2)))

    // Calculate recoveries (about 10% of active cases recover each day)
    const dailyRecoveries = Math.floor(activeCases * 0.1)

    // Update active cases
    activeCases = Math.max(0, activeCases + newCases - dailyRecoveries)
    recoveredCases += dailyRecoveries
    totalCases += newCases

    // Calculate resource usage (varies based on active cases)
    resourceUsage = Math.min(100, 40 + (activeCases / 1000) * 5)

    metrics.push({
      day,
      activeCases,
      newCases,
      recoveredCases,
      resourceUsage,
    })
  }

  return metrics
}

export async function POST(request: Request) {
  try {
    const params: SimulationParams = await request.json()

    // Add a small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Run the simulation with the provided parameters
    const result = runSimulation(params)

    // Return the simulation results
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error running simulation:", error)
    return NextResponse.json({ error: "Failed to run simulation" }, { status: 500 })
  }
}
