"use client"

import { useEffect, useRef, useState } from "react"
import { usaStates } from "@/lib/usa-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(true)
  const [routeData, setRouteData] = useState<any[]>([])

  // Load the map
  useEffect(() => {
    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Load Google Maps API
    const loadGoogleMapsScript = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

      if (!apiKey) {
        console.error("Google Maps API key is missing")
        setMapError("Google Maps API key is missing. Please check your environment variables.")
        setMapLoaded(true)
        setIsLoading(false)
        return
      }

      // Create the script element
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true

      // Handle script load success
      script.onload = () => {
        console.log("Google Maps script loaded successfully")
        initializeMap()
      }

      // Handle script load error
      script.onerror = (e) => {
        console.error("Failed to load Google Maps script", e)
        setMapError("Failed to load Google Maps. Please check your API key and ensure Maps JavaScript API is enabled.")
        setMapLoaded(true)
        setIsLoading(false)
      }

      document.head.appendChild(script)
    }

    loadGoogleMapsScript()

    return () => {
      // Cleanup markers and routes when component unmounts
      if (markers.length > 0) {
        markers.forEach((marker) => marker.setMap(null))
      }
      if (routes.length > 0) {
        routes.forEach((route) => route.setMap(null))
      }
    }
  }, [])

  // Initialize the map
  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      console.error("Google Maps not available or map ref not ready")
      setMapError("Google Maps not available. Please refresh the page.")
      setMapLoaded(true)
      setIsLoading(false)
      return
    }

    try {
      console.log("Initializing Google Maps")

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

      // Fetch route data after map is loaded
      fetchRouteData(routeType, region, optimizationPriority)

      if (onMapLoaded) {
        onMapLoaded()
      }
    } catch (error) {
      console.error("Error initializing Google Maps:", error)
      setMapError("Error initializing Google Maps. Please try again.")
      setMapLoaded(true)
      setIsLoading(false)
    }
  }

  // Fetch route data from API
  const fetchRouteData = async (type: string, region: string, priority: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/routes?type=${type}&region=${region}&priority=${priority}`)
      const data = await response.json()

      if (data.routes) {
        setRouteData(data.routes)
        // Display routes on map
        if (mapInstance) {
          displayRoutesOnMap(data.routes, mapInstance)
        }
      } else {
        console.error("No routes data returned from API")
        setRouteData([])
      }
    } catch (error) {
      console.error("Error fetching route data:", error)
      // Use fallback data if API fails
      const fallbackData = generateFallbackData(type, region)
      setRouteData(fallbackData)
      if (mapInstance) {
        displayRoutesOnMap(fallbackData, mapInstance)
      }
    } finally {
      setIsLoading(false)
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

  // Update map data when filters change
  useEffect(() => {
    if (!mapInstance || !mapLoaded) return

    // Clear existing markers and routes
    clearMapData()

    // Fetch and display new data based on filters
    fetchRouteData(routeType, region, optimizationPriority)
  }, [mapInstance, mapLoaded, routeType, region, optimizationPriority])

  // Clear existing map data
  const clearMapData = () => {
    // Clear markers
    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])

    // Clear routes
    routes.forEach((route) => route.setMap(null))
    setRoutes([])
  }

  // Display routes on the map
  const displayRoutesOnMap = (routesData: any[], map: google.maps.Map) => {
    if (!map || !window.google || !window.google.maps) return

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
          map: map,
        })
        newRoutes.push(polyline)
      }

      // Create markers for locations if they exist
      if (route.locations && route.locations.length > 0) {
        route.locations.forEach((location: any) => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title || route.subtype,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: routeColor,
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            },
          })

          // Add info window for each marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div style="font-family: Arial, sans-serif; padding: 5px;">
                      <h3 style="margin: 0 0 5px 0;">${location.title || route.subtype}</h3>
                      <p style="margin: 0;">Type: ${route.type}</p>
                      <p style="margin: 0;">Efficiency: ${route.efficiency?.toFixed(1) || "85.0"}%</p>
                      <p style="margin: 0;">Status: ${route.status || "Active"}</p>
                    </div>`,
          })

          marker.addListener("click", () => {
            infoWindow.open(map, marker)
          })

          newMarkers.push(marker)
        })
      }
    })

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

      {mapError && (
        <Alert variant="destructive" className="absolute top-2 left-2 right-2 z-20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Map Error</AlertTitle>
          <AlertDescription>
            {mapError}
            <div className="mt-2">
              <p>Please check that:</p>
              <ol className="list-decimal ml-5 mt-1 space-y-1 text-sm">
                <li>Your Google Maps API key is correctly set as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</li>
                <li>The Maps JavaScript API is enabled in your Google Cloud Console</li>
                <li>Your API key doesn't have any restrictions that would prevent it from working</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div ref={mapRef} className="w-full h-full rounded-md" style={{ minHeight: "600px" }} />

      {/* Legend */}
      {mapLoaded && !mapError && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-10">
          <h3 className="text-sm font-medium mb-2">Route Types</h3>
          <div className="space-y-2">
            {(routeType === "all" || routeType === "distribution") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs">Distribution Routes</span>
              </div>
            )}
            {(routeType === "all" || routeType === "testing") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs">Testing Routes</span>
              </div>
            )}
            {(routeType === "all" || routeType === "vaccination") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs">Vaccination Routes</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Add the global type for the callback function
declare global {
  interface Window {
    google: any
  }
}
