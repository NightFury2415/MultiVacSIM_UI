"use client"

import { useEffect, useRef, useState } from "react"
import { usaStates } from "@/lib/usa-data"

type MapProps = {
  routeType?: string
  region?: string
  optimizationPriority?: string
  onMapLoaded?: () => void
}

export default function GoogleMapComponent({
  routeType = "all",
  region = "all",
  optimizationPriority = "balanced",
  onMapLoaded,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [routes, setRoutes] = useState<google.maps.Polyline[]>([])

  // Load the map (yes)
  useEffect(() => {
    // Direct script loading approach
    const loadGoogleMapsScript = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

      if (!apiKey) {
        console.error("Google Maps API key is missing")
        setMapError("Google Maps API key is missing. Please check your environment variables.")
        setMapLoaded(true)
        return
      }

      // Check if the script is already loaded
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Create the script element
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMap`
      script.async = true
      script.defer = true

      // Define the callback function
      window.initGoogleMap = () => {
        initializeMap()
      }

      // Handle script load error
      script.onerror = () => {
        console.error("Failed to load Google Maps script")
        setMapError("Failed to load Google Maps. Please check your API key.")
        setMapLoaded(true)
      }

      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      try {
        // Create the map instance centered on the USA
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of the USA
          zoom: 4, // Zoom level to show the entire USA
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        })

        setMapInstance(map)
        setMapLoaded(true)
        setMapError(null)

        if (onMapLoaded) {
          onMapLoaded()
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error)
        setMapError("Error initializing Google Maps. Please try again.")
        setMapLoaded(true)
      }
    }

    // Start loading the map
    loadGoogleMapsScript()

    return () => {
      // Cleanup
      if (window.initGoogleMap) {
        // @ts-ignore
        window.initGoogleMap = undefined
      }
    }
  }, [onMapLoaded])

  // Update map data when filters change
  useEffect(() => {
    if (!mapInstance) return

    // Clear existing markers and routes
    clearMapData()

    // Fetch and display new data based on filters
    fetchAndDisplayData(routeType, region, optimizationPriority)
  }, [mapInstance, routeType, region, optimizationPriority])

  // Clear existing map data
  const clearMapData = () => {
    // Clear markers
    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])

    // Clear routes
    routes.forEach((route) => route.setMap(null))
    setRoutes([])
  }

  // Fetch and display data based on filters
  const fetchAndDisplayData = async (routeType: string, region: string, optimizationPriority: string) => {
    if (!mapInstance) return

    try {
      // Fetch data from API
      const response = await fetch(`/api/routes?type=${routeType}&region=${region}&priority=${optimizationPriority}`)
      const data = await response.json()

      if (!data.routes) {
        console.error("No routes data returned from API")
        return
      }

      // Process and display the data
      displayRoutesOnMap(data.routes)
    } catch (error) {
      console.error("Error fetching route data:", error)
      // Use fallback data if API fails
      displayFallbackData(routeType, region)
    }
  }

  // Display routes on the map
  const displayRoutesOnMap = (routesData: any[]) => {
    if (!mapInstance || !window.google) return

    const newMarkers: google.maps.Marker[] = []
    const newRoutes: google.maps.Polyline[] = []

    // Process each route
    routesData.forEach((route) => {
      // Get route color based on type
      const routeColor = getRouteColor(route.type)

      // Create route polyline if path exists
      if (route.path && route.path.length > 0) {
        const polyline = new window.google.maps.Polyline({
          path: route.path,
          geodesic: true,
          strokeColor: routeColor,
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: mapInstance,
        })
        newRoutes.push(polyline)
      }

      // Create markers for locations if they exist
      if (route.locations && route.locations.length > 0) {
        route.locations.forEach((location: any) => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: location.title || route.subtype,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: routeColor,
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            },
          })
          newMarkers.push(marker)
        })
      }
    })

    setMarkers(newMarkers)
    setRoutes(newRoutes)
  }

  // Display fallback data if API fails
  const displayFallbackData = (routeType: string, region: string) => {
    if (!mapInstance || !window.google) return

    const newMarkers: google.maps.Marker[] = []
    const newRoutes: google.maps.Polyline[] = []

    // Generate fallback data based on USA states
    const filteredStates =
      region === "all" ? usaStates : usaStates.filter((state) => state.region.toLowerCase() === region.toLowerCase())

    // Create distribution centers and routes
    if (routeType === "all" || routeType === "distribution") {
      const distributionStates = filteredStates.slice(0, 10)

      // Create distribution route
      if (distributionStates.length > 1) {
        const path = distributionStates.map((state) => ({ lat: state.lat, lng: state.lng }))
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#10b981", // emerald-500
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: mapInstance,
        })
        newRoutes.push(polyline)
      }

      // Create distribution markers
      distributionStates.forEach((state) => {
        const marker = new window.google.maps.Marker({
          position: { lat: state.lat, lng: state.lng },
          map: mapInstance,
          title: `${state.name} Distribution Center`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#10b981", // emerald-500
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8,
          },
        })
        newMarkers.push(marker)
      })
    }

    // Create testing centers and routes
    if (routeType === "all" || routeType === "testing") {
      const testingStates = filteredStates.slice(10, 20)

      // Create testing route
      if (testingStates.length > 1) {
        const path = testingStates.map((state) => ({ lat: state.lat, lng: state.lng }))
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#3b82f6", // blue-500
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: mapInstance,
        })
        newRoutes.push(polyline)
      }

      // Create testing markers
      testingStates.forEach((state) => {
        const marker = new window.google.maps.Marker({
          position: { lat: state.lat, lng: state.lng },
          map: mapInstance,
          title: `${state.name} Testing Center`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#3b82f6", // blue-500
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8,
          },
        })
        newMarkers.push(marker)
      })
    }

    // Create vaccination centers and routes
    if (routeType === "all" || routeType === "vaccination") {
      const vaccinationStates = filteredStates.slice(20, 30)

      // Create vaccination route
      if (vaccinationStates.length > 1) {
        const path = vaccinationStates.map((state) => ({ lat: state.lat, lng: state.lng }))
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#8b5cf6", // purple-500
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: mapInstance,
        })
        newRoutes.push(polyline)
      }

      // Create vaccination markers
      vaccinationStates.forEach((state) => {
        const marker = new window.google.maps.Marker({
          position: { lat: state.lat, lng: state.lng },
          map: mapInstance,
          title: `${state.name} Vaccination Center`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#8b5cf6", // purple-500
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8,
          },
        })
        newMarkers.push(marker)
      })
    }

    setMarkers(newMarkers)
    setRoutes(newRoutes)
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

  // Fallback to canvas if there's an error or no API key
  const renderFallbackMap = () => {
    if (!mapRef.current) return

    const container = mapRef.current
    // Clear any existing content
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    const canvas = document.createElement("canvas")
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    canvas.style.borderRadius = "0.375rem" // rounded-md
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Draw USA map outline (simplified)
      ctx.fillStyle = "#e5e7eb" // bg-gray-200
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw a simplified USA outline
      ctx.strokeStyle = "#9ca3af" // gray-400
      ctx.lineWidth = 2
      ctx.beginPath()

      // Very simplified USA outline
      const usaOutline = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { x: canvas.width * 0.8, y: canvas.height * 0.3 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7 },
        { x: canvas.width * 0.2, y: canvas.height * 0.7 },
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
      ]

      ctx.moveTo(usaOutline[0].x, usaOutline[0].y)
      for (let i = 1; i < usaOutline.length; i++) {
        ctx.lineTo(usaOutline[i].x, usaOutline[i].y)
      }
      ctx.stroke()

      // Draw routes based on filter
      if (routeType === "all" || routeType === "distribution") {
        // Distribution route (green)
        ctx.strokeStyle = "#10b981" // emerald-500
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.3, canvas.height * 0.4)
        ctx.lineTo(canvas.width * 0.5, canvas.height * 0.5)
        ctx.lineTo(canvas.width * 0.7, canvas.height * 0.4)
        ctx.stroke()
      }

      if (routeType === "all" || routeType === "testing") {
        // Testing route (blue)
        ctx.strokeStyle = "#3b82f6" // blue-500
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.3, canvas.height * 0.6)
        ctx.lineTo(canvas.width * 0.5, canvas.height * 0.5)
        ctx.lineTo(canvas.width * 0.7, canvas.height * 0.6)
        ctx.stroke()
      }

      if (routeType === "all" || routeType === "vaccination") {
        // Vaccination route (purple)
        ctx.strokeStyle = "#8b5cf6" // purple-500
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.3, canvas.height * 0.5)
        ctx.lineTo(canvas.width * 0.5, canvas.height * 0.4)
        ctx.lineTo(canvas.width * 0.7, canvas.height * 0.5)
        ctx.stroke()
      }

      // Draw markers based on filter
      const distributionPoints = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5 },
        { x: canvas.width * 0.7, y: canvas.height * 0.4 },
      ]

      const testingPoints = [
        { x: canvas.width * 0.3, y: canvas.height * 0.6 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5 },
        { x: canvas.width * 0.7, y: canvas.height * 0.6 },
      ]

      const vaccinationPoints = [
        { x: canvas.width * 0.3, y: canvas.height * 0.5 },
        { x: canvas.width * 0.5, y: canvas.height * 0.4 },
        { x: canvas.width * 0.7, y: canvas.height * 0.5 },
      ]

      if (routeType === "all" || routeType === "distribution") {
        distributionPoints.forEach((point) => {
          ctx.fillStyle = "#10b981" // emerald-500
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      if (routeType === "all" || routeType === "testing") {
        testingPoints.forEach((point) => {
          ctx.fillStyle = "#3b82f6" // blue-500
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      if (routeType === "all" || routeType === "vaccination") {
        vaccinationPoints.forEach((point) => {
          ctx.fillStyle = "#8b5cf6" // purple-500
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // Add error message
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(10, 10, canvas.width - 20, 40)
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText(mapError || "Google Maps visualization (API key required)", canvas.width / 2, 30)
    }
  }

  useEffect(() => {
    if (mapError && mapRef.current) {
      renderFallbackMap()
    }
  }, [mapError, mapLoaded, routeType, region])

  return (
    <div className="w-full h-full">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading Google Maps...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-md" />
    </div>
  )
}

// Add the global type for the callback function
declare global {
  interface Window {
    initGoogleMap?: () => void
    google: typeof google
  }
}
