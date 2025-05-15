"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { usaStates } from "@/lib/usa-data"

type MapProps = {
  routeType?: string
  region?: string
  optimizationPriority?: string
  onMapLoaded?: () => void
}

export default function CanvasMap({
  routeType = "all",
  region = "all",
  optimizationPriority = "balanced",
  onMapLoaded,
}: MapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [routeData, setRouteData] = useState<any[]>([])
  const [mapState, setMapState] = useState({
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  })

  // Initialize the map
  useEffect(() => {
    if (!containerRef.current) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return

      // Set explicit dimensions
      const container = containerRef.current
      const width = container.clientWidth || 800
      const height = container.clientHeight || 600

      canvasRef.current.width = width
      canvasRef.current.height = height

      // Force a redraw after resize
      drawMap()
    }

    // Initial resize
    resizeCanvas()

    // Add resize listener
    window.addEventListener("resize", resizeCanvas)

    // Fetch initial data
    fetchRouteData(routeType, region, optimizationPriority)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
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
  useEffect(() => {
    if (isLoading) return

    // Draw the map whenever relevant state changes
    drawMap()

    console.log("Map drawn with", routeData.length, "routes")
  }, [routeData, isLoading, mapState, routeType])

  // Draw USA map
  const drawUSAMap = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    mapState: { zoom: number; offsetX: number; offsetY: number },
  ) => {
    // Draw each state
    usaStates.forEach((state) => {
      // Transform coordinates based on zoom and offset
      const x = width / 2 + (state.lng + 98) * 10 * mapState.zoom + mapState.offsetX
      const y = height / 2 - (state.lat - 40) * 10 * mapState.zoom + mapState.offsetY

      // Draw state
      ctx.fillStyle = "#e5e7eb" // bg-gray-200
      ctx.strokeStyle = "#d1d5db" // bg-gray-300
      ctx.lineWidth = 0.5

      ctx.beginPath()
      ctx.arc(x, y, 5 * mapState.zoom, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Draw state name if zoom is high enough
      if (mapState.zoom > 1.5) {
        ctx.fillStyle = "#6b7280" // text-gray-500
        ctx.font = `${10 * mapState.zoom}px sans-serif`
        ctx.textAlign = "center"
        ctx.fillText(state.name, x, y + 15 * mapState.zoom)
      }
    })
  }

  // Draw routes and locations
  const drawRoutesAndLocations = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    routes: any[],
    mapState: { zoom: number; offsetX: number; offsetY: number },
  ) => {
    routes.forEach((route) => {
      // Get route color based on type
      const routeColor = getRouteColor(route.type)

      // Draw route path
      if (route.path && route.path.length > 1) {
        ctx.strokeStyle = routeColor
        ctx.lineWidth = 2 * mapState.zoom
        ctx.beginPath()

        // Transform first point
        const firstPoint = route.path[0]
        const startX = width / 2 + (firstPoint.lng + 98) * 10 * mapState.zoom + mapState.offsetX
        const startY = height / 2 - (firstPoint.lat - 40) * 10 * mapState.zoom + mapState.offsetY
        ctx.moveTo(startX, startY)

        // Draw lines to remaining points
        for (let i = 1; i < route.path.length; i++) {
          const point = route.path[i]
          const x = width / 2 + (point.lng + 98) * 10 * mapState.zoom + mapState.offsetX
          const y = height / 2 - (point.lat - 40) * 10 * mapState.zoom + mapState.offsetY
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      // Draw locations
      if (route.locations && route.locations.length > 0) {
        route.locations.forEach((location: any) => {
          // Transform coordinates
          const x = width / 2 + (location.lng + 98) * 10 * mapState.zoom + mapState.offsetX
          const y = height / 2 - (location.lat - 40) * 10 * mapState.zoom + mapState.offsetY

          // Draw location marker
          ctx.fillStyle = routeColor
          ctx.beginPath()
          ctx.arc(x, y, 6 * mapState.zoom, 0, Math.PI * 2)
          ctx.fill()

          // Draw location title if zoom is high enough
          if (mapState.zoom > 1.2 && location.title) {
            ctx.fillStyle = "#1f2937" // text-gray-800
            ctx.font = `${9 * mapState.zoom}px sans-serif`
            ctx.textAlign = "center"
            ctx.fillText(location.title, x, y - 10 * mapState.zoom)
          }
        })
      }
    })
  }

  // Draw zoom controls
  const drawZoomControls = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw zoom in button
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.strokeStyle = "#d1d5db" // bg-gray-300
    ctx.lineWidth = 1

    // Zoom in button
    ctx.beginPath()
    ctx.rect(width - 40, height - 80, 30, 30)
    ctx.fill()
    ctx.stroke()

    // Plus sign
    ctx.fillStyle = "#4b5563" // text-gray-600
    ctx.beginPath()
    ctx.rect(width - 30, height - 70, 10, 2)
    ctx.rect(width - 26, height - 74, 2, 10)
    ctx.fill()

    // Zoom out button
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.beginPath()
    ctx.rect(width - 40, height - 40, 30, 30)
    ctx.fill()
    ctx.stroke()

    // Minus sign
    ctx.fillStyle = "#4b5563" // text-gray-600
    ctx.beginPath()
    ctx.rect(width - 30, height - 30, 10, 2)
    ctx.fill()
  }

  // Draw legend
  const drawLegend = (ctx: CanvasRenderingContext2D, width: number, height: number, routeType: string) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.strokeStyle = "#d1d5db" // bg-gray-300
    ctx.lineWidth = 1

    // Legend box
    ctx.beginPath()
    ctx.rect(10, height - 120, 180, 110)
    ctx.fill()
    ctx.stroke()

    // Title
    ctx.fillStyle = "#1f2937" // text-gray-800
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
      ctx.fillStyle = "#4b5563" // text-gray-600
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

  // Handle mouse events for panning and zooming
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMapState((prev) => ({
      ...prev,
      isDragging: true,
      lastX: e.clientX,
      lastY: e.clientY,
    }))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mapState.isDragging) return

    const dx = e.clientX - mapState.lastX
    const dy = e.clientY - mapState.lastY

    setMapState((prev) => ({
      ...prev,
      offsetX: prev.offsetX + dx,
      offsetY: prev.offsetY + dy,
      lastX: e.clientX,
      lastY: e.clientY,
    }))
  }

  const handleMouseUp = () => {
    setMapState((prev) => ({
      ...prev,
      isDragging: false,
    }))
  }

  const handleMouseLeave = () => {
    setMapState((prev) => ({
      ...prev,
      isDragging: false,
    }))
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if zoom in button was clicked
    if (x >= canvas.width - 40 && x <= canvas.width - 10 && y >= canvas.height - 80 && y <= canvas.height - 50) {
      setMapState((prev) => ({
        ...prev,
        zoom: Math.min(prev.zoom * 1.2, 3),
      }))
      return
    }

    // Check if zoom out button was clicked
    if (x >= canvas.width - 40 && x <= canvas.width - 10 && y >= canvas.height - 40 && y <= canvas.height - 10) {
      setMapState((prev) => ({
        ...prev,
        zoom: Math.max(prev.zoom / 1.2, 0.5),
      }))
      return
    }
  }

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    // Zoom in or out based on wheel direction
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1

    setMapState((prev) => ({
      ...prev,
      zoom: Math.min(Math.max(prev.zoom * zoomFactor, 0.5), 3),
    }))
  }

  // Add this function to the component
  const drawMap = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f3f4f6" // bg-gray-100
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw USA map
    drawUSAMap(ctx, canvas.width, canvas.height, mapState)

    // Draw routes and locations
    if (routeData.length > 0) {
      drawRoutesAndLocations(ctx, canvas.width, canvas.height, routeData, mapState)
    }

    // Draw zoom controls
    drawZoomControls(ctx, canvas.width, canvas.height)

    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height, routeType)

    // Add a label to confirm the map is rendered
    ctx.fillStyle = "#000000"
    ctx.font = "12px sans-serif"
    ctx.fillText("USA Map - Drag to pan, scroll to zoom", 10, 20)
  }

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ minHeight: "600px" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading map data...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-md cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onWheel={handleWheel}
      />
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">
        Interactive USA Map | Zoom: {mapState.zoom.toFixed(1)}x
      </div>

      {/* Fallback message if canvas is empty */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-gray-500">Interactive map requires JavaScript to be enabled.</p>
        </div>
      </noscript>
    </div>
  )
}
