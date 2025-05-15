import { NextResponse } from "next/server"
import { usaStates } from "@/lib/usa-data"

// This is a more comprehensive API for disease data
// In a real application, this would connect to a database or external API

type DiseaseData = {
  covid: {
    activeCases: number
    newCases: number
    recoveredCases: number
    totalCases: number
    weeklyTrend: number
    regionalData: RegionalData[]
    dailyData: DailyData[]
  }
  flu: {
    activeCases: number
    newCases: number
    recoveredCases: number
    totalCases: number
    weeklyTrend: number
    regionalData: RegionalData[]
    dailyData: DailyData[]
  }
}

type RegionalData = {
  region: string
  activeCases: number
  newCases: number
  vaccinationRate: number
  states: StateData[]
}

type StateData = {
  name: string
  activeCases: number
  newCases: number
  vaccinationRate: number
}

type DailyData = {
  date: string
  activeCases: number
  newCases: number
  recoveredCases: number
}

// Generate sample disease data
function generateDiseaseData(): DiseaseData {
  // Regions
  const regions = ["North", "South", "East", "West", "Central"]

  // Generate COVID-19 data
  const covidActiveCases = 10000 + Math.floor(Math.random() * 5000)
  const covidNewCases = 500 + Math.floor(Math.random() * 300)
  const covidRecoveredCases = 50000 + Math.floor(Math.random() * 10000)
  const covidTotalCases = covidActiveCases + covidRecoveredCases
  const covidWeeklyTrend = -1 + Math.random() * 4 // Between -1% and +3%

  // Generate Flu data
  const fluActiveCases = 8000 + Math.floor(Math.random() * 3000)
  const fluNewCases = 300 + Math.floor(Math.random() * 200)
  const fluRecoveredCases = 30000 + Math.floor(Math.random() * 8000)
  const fluTotalCases = fluActiveCases + fluRecoveredCases
  const fluWeeklyTrend = -2 + Math.random() * 3 // Between -2% and +1%

  // Generate regional data
  const covidRegionalData: RegionalData[] = []
  const fluRegionalData: RegionalData[] = []

  regions.forEach((region) => {
    // Get states for this region
    const regionStates = usaStates.filter((state) => state.region === region)

    // Generate state-level data
    const covidStateData: StateData[] = []
    const fluStateData: StateData[] = []

    regionStates.forEach((state) => {
      // COVID-19 state data
      covidStateData.push({
        name: state.name,
        activeCases: Math.floor((covidActiveCases / usaStates.length) * (0.7 + Math.random() * 0.6)),
        newCases: Math.floor((covidNewCases / usaStates.length) * (0.7 + Math.random() * 0.6)),
        vaccinationRate: 65 + Math.random() * 20,
      })

      // Flu state data
      fluStateData.push({
        name: state.name,
        activeCases: Math.floor((fluActiveCases / usaStates.length) * (0.7 + Math.random() * 0.6)),
        newCases: Math.floor((fluNewCases / usaStates.length) * (0.7 + Math.random() * 0.6)),
        vaccinationRate: 55 + Math.random() * 25,
      })
    })

    // COVID-19 regional data
    covidRegionalData.push({
      region,
      activeCases: covidStateData.reduce((sum, state) => sum + state.activeCases, 0),
      newCases: covidStateData.reduce((sum, state) => sum + state.newCases, 0),
      vaccinationRate: covidStateData.reduce((sum, state) => sum + state.vaccinationRate, 0) / covidStateData.length,
      states: covidStateData,
    })

    // Flu regional data
    fluRegionalData.push({
      region,
      activeCases: fluStateData.reduce((sum, state) => sum + state.activeCases, 0),
      newCases: fluStateData.reduce((sum, state) => sum + state.newCases, 0),
      vaccinationRate: fluStateData.reduce((sum, state) => sum + state.vaccinationRate, 0) / fluStateData.length,
      states: fluStateData,
    })
  })

  // Generate daily data for the past 30 days
  const covidDailyData: DailyData[] = []
  const fluDailyData: DailyData[] = []

  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split("T")[0]

    // COVID-19 daily data with some trend
    const covidFactor = 1 + (Math.random() * 0.1 - 0.05) // Random factor between 0.95 and 1.05
    const covidDailyActive = Math.floor((covidActiveCases * 0.8 + i * covidActiveCases * 0.01) * covidFactor)
    const covidDailyNew = Math.floor((covidNewCases * 0.8 + i * covidNewCases * 0.01) * covidFactor)
    const covidDailyRecovered = Math.floor((covidRecoveredCases * 0.8 + i * covidRecoveredCases * 0.005) * covidFactor)

    covidDailyData.push({
      date: dateString,
      activeCases: covidDailyActive,
      newCases: covidDailyNew,
      recoveredCases: covidDailyRecovered,
    })

    // Flu daily data with some trend
    const fluFactor = 1 + (Math.random() * 0.1 - 0.05) // Random factor between 0.95 and 1.05
    const fluDailyActive = Math.floor((fluActiveCases * 0.8 + i * fluActiveCases * 0.01) * fluFactor)
    const fluDailyNew = Math.floor((fluNewCases * 0.8 + i * fluNewCases * 0.01) * fluFactor)
    const fluDailyRecovered = Math.floor((fluRecoveredCases * 0.8 + i * fluRecoveredCases * 0.005) * fluFactor)

    fluDailyData.push({
      date: dateString,
      activeCases: fluDailyActive,
      newCases: fluDailyNew,
      recoveredCases: fluDailyRecovered,
    })
  }

  return {
    covid: {
      activeCases: covidActiveCases,
      newCases: covidNewCases,
      recoveredCases: covidRecoveredCases,
      totalCases: covidTotalCases,
      weeklyTrend: Number.parseFloat(covidWeeklyTrend.toFixed(1)),
      regionalData: covidRegionalData,
      dailyData: covidDailyData,
    },
    flu: {
      activeCases: fluActiveCases,
      newCases: fluNewCases,
      recoveredCases: fluRecoveredCases,
      totalCases: fluTotalCases,
      weeklyTrend: Number.parseFloat(fluWeeklyTrend.toFixed(1)),
      regionalData: fluRegionalData,
      dailyData: fluDailyData,
    },
  }
}

export async function GET() {
  try {
    // Add a small delay to simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate disease data
    const data = generateDiseaseData()

    // Return the data
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error generating disease data:", error)
    return NextResponse.json({ error: "Failed to generate disease data" }, { status: 500 })
  }
}
