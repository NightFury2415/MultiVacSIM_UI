// Utility functions to fetch and process CSV data

export async function fetchCSVData(url: string) {
  try {
    const response = await fetch(url)
    const text = await response.text()
    return parseCSV(text)
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    return []
  }
}

function parseCSV(text: string) {
  const lines = text.trim().split("\n")
  const headers = lines[0].split(",")

  return lines.slice(1).map((line) => {
    const values = line.split(",")
    const entry: Record<string, string | number> = {}

    headers.forEach((header, index) => {
      const value = values[index]
      // Convert numeric values to numbers
      entry[header] = isNaN(Number(value)) ? value : Number(value)
    })

    return entry
  })
}

// Process data for charts
export function processDataForCharts(data: any[], episodeInterval = 10) {
  // Filter data to reduce points (e.g., every 10th episode)
  return data.filter((_, index) => index % episodeInterval === 0)
}

// URLs for the CSV files
export const dataUrls = {
  covidRawNational:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/covid_raw_national_rewards-WEr5fJcR97gWQOvpi4NPKYdTIpkPoK.csv",
  covidNormalizedState:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/covid_normalized_state_rewards-9rexnJ5RlU9Ly52wzbqE4L01MM1aWX.csv",
  covidNormalizedNational:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/covid_normalized_national_rewards-wARkeLUUVG2WDwSC80aYTVNGTlhE8H.csv",
  fluNormalizedNational:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flu_normalized_national_rewards-koWHbhqBLThidnsXKY4b7idNsXL66z.csv",
  fluNormalizedRegional:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flu_normalized_regional_rewards-rH3vcVmBABRHh9lhNROA0sIatrKW7y.csv",
  fluRawNational:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flu_raw_national_rewards-A3OAph6ZTE69zWwVznjH6lGT4Qlpy0.csv",
}
