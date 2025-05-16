"use client"

import { useEffect, useRef, useState } from "react"
import { usaStates } from "@/lib/usa-data"

type MapProps = {
  routeType?: string
  region?: string
  optimizationPriority?: string
  onMapLoaded?: () => void
}

export default function FallbackMap({
  routeType = "all",
  region = "all",
  optimizationPriority = "balanced",
  onMapLoaded,
}: MapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [routeData, setRouteData] = useState<any[]>([])

  // Initialize the map
  useEffect(() => {
    // Fetch initial data
    fetchRouteData(routeType, region, optimizationPriority)

    // Set up canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      // Draw initial map
      drawMap()
    }

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth
        canvasRef.current.height = canvasRef.current.clientHeight
        drawMap()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [routeType, region, optimizationPriority])

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
      // Generate fallback data
      setRouteData(generateFallbackData(type, region))
    } finally {
      setIsLoading(false)
      if (onMapLoaded) onMapLoaded()

      // Force a redraw after data is loaded
      setTimeout(drawMap, 100)
    }
  }

  // Generate fallback data if API fails
  const generateFallbackData = (type: string, region: string) => {
    const fallbackData = []
    const filteredStates =
      region === "all" ? usaStates : usaStates.filter((state) => state.region.toLowerCase() === region.toLowerCase())

    // Create distribution routes
    if (type === "all" || type === "distribution") {
      const distributionStates = filteredStates.slice(0, 10)
      fallbackData.push({
        id: "DR-1000",
        type: "distribution",
        subtype: "Medical Supplies",
        region: region === "all" ? "National" : region,
        efficiency: 87.5,
        status: "Active",
        path: distributionStates.map((state) => ({ lat: state.lat, lng: state.lng })),
        locations: distributionStates.map((state) => ({
          lat: state.lat,
          lng: state.lng,
          title: `${state.name} Distribution Center`,
        })),
      })
    }

    // Create testing routes
    if (type === "all" || type === "testing") {
      const testingStates = filteredStates.slice(10, 20)
      fallbackData.push({
        id: "TR-2000",
        type: "testing",
        subtype: "Drive-through",
        region: region === "all" ? "National" : region,
        efficiency: 85.2,
        status: "Active",
        path: testingStates.map((state) => ({ lat: state.lat, lng: state.lng })),
        locations: testingStates.map((state) => ({
          lat: state.lat,
          lng: state.lng,
          title: `${state.name} Testing Center`,
        })),
      })
    }

    // Create vaccination routes
    if (type === "all" || type === "vaccination") {
      const vaccinationStates = filteredStates.slice(20, 30)
      fallbackData.push({
        id: "VR-3000",
        type: "vaccination",
        subtype: "COVID-19",
        region: region === "all" ? "National" : region,
        efficiency: 89.7,
        status: "Active",
        path: vaccinationStates.map((state) => ({ lat: state.lat, lng: state.lng })),
        locations: vaccinationStates.map((state) => ({
          lat: state.lat,
          lng: state.lng,
          title: `${state.name} Vaccination Center`,
        })),
      })
    }

    return fallbackData
  }

  // Draw the map
  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw USA map
    drawUSAMap(ctx, canvas.width, canvas.height)

    // Draw routes
    if (routeData.length > 0) {
      drawRoutes(ctx, canvas.width, canvas.height, routeData)
    }

    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height, routeType)

    // Add title
    ctx.fillStyle = "#111827"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("USA Vaccine Distribution Map (Canvas Fallback)", canvas.width / 2, 20)
  }

  // Draw USA map
  const drawUSAMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw each state
    usaStates.forEach((state) => {
      // Transform coordinates to fit canvas
      const x = width / 2 + (state.lng + 98) * 10
      const y = height / 2 - (state.lat - 40) * 10

      // Draw state
      ctx.fillStyle = "#e5e7eb"
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 0.5

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Draw state name if canvas is large enough
      if (width > 600) {
        ctx.fillStyle = "#6b7280"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(state.name, x, y + 15)
      }
    })
  }

  // Draw routes
  const drawRoutes = (ctx: CanvasRenderingContext2D, width: number, height: number, routes: any[]) => {
    routes.forEach((route) => {
      // Get route color based on type
      const routeColor = getRouteColor(route.type)

      // Draw route path
      if (route.path && route.path.length > 1) {
        ctx.strokeStyle = routeColor
        ctx.lineWidth = 2
        ctx.beginPath()

        // Transform first point
        const firstPoint = route.path[0]
        const startX = width / 2 + (firstPoint.lng + 98) * 10
        const startY = height / 2 - (firstPoint.lat - 40) * 10
        ctx.moveTo(startX, startY)

        // Draw lines to remaining points
        for (let i = 1; i < route.path.length; i++) {
          const point = route.path[i]
          const x = width / 2 + (point.lng + 98) * 10
          const y = height / 2 - (point.lat - 40) * 10
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      // Draw locations
      if (route.locations && route.locations.length > 0) {
        route.locations.forEach((location: any) => {
          // Transform coordinates
          const x = width / 2 + (location.lng + 98) * 10
          const y = height / 2 - (location.lat - 40) * 10

          // Draw location marker
          ctx.fillStyle = routeColor
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()

          // Draw location title if canvas is large enough
          if (width > 800 && location.title) {
            ctx.fillStyle = "#111827"
            ctx.font = "9px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText(location.title, x, y - 10)
          }
        })
      }
    })
  }

  // Draw legend
  const drawLegend = (ctx: CanvasRenderingContext2D, width: number, height: number, routeType: string) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1

    // Legend box
    ctx.beginPath()
    ctx.rect(10, height - 120, 180, 110)
    ctx.fill()
    ctx.stroke()

    // Title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Route Types", 20, height - 100)

    // Legend items
    const legendItems = []

    if (routeType === "all" || routeType === "distribution") {
      legendItems.push({ color: "#10b981", label: "Distribution Routes" })
    }

    if (routeType === "all" || routeType === "testing") {
      legendItems.push({ color: "#3b82f6", label: "Testing Routes" })
    }

    if (routeType === "all" || routeType === "vaccination") {
      legendItems.push({ color: "#8b5cf6", label: "Vaccination Routes" })
    }

    // Draw legend items
    legendItems.forEach((item, index) => {
      const y = height - 80 + index * 20

      // Color circle
      ctx.fillStyle = item.color
      ctx.beginPath()
      ctx.arc(25, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Label
      ctx.fillStyle = "#4b5563"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(item.label, 40, y + 4)
    })
  }

  // Get route color based on type
  const getRouteColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "distribution":
        return "#10b981" // emerald-500
      case "testing":
        return "#3b82f6" // blue-500
      case "vaccination":
        return "#8b5cf6" // purple-500
      default:
        return "#f59e0b" // amber-500
    }
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading map data...</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full rounded-md" />
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">Canvas Fallback Map | Using local rendering</div>
    </div>
  )
}
