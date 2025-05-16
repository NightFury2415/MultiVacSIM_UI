// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle } from "lucide-react"
// import Image from "next/image"

// type MapProps = {
//   routeType: string
//   region: string
//   optimizationPriority: string
// }

// export default function GoogleMapComponent({ routeType, region, optimizationPriority }: MapProps) {
//   const mapRef = useRef<HTMLDivElement>(null)
//   const [mapLoaded, setMapLoaded] = useState(false)
//   const [mapError, setMapError] = useState<string | null>(null)
//   const [mapInstance, setMapInstance] = useState<any | null>(null)
//   const [markers, setMarkers] = useState<any[]>([])
//   const [routes, setRoutes] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [useFallback, setUseFallback] = useState(false)

//   // Load the map
//   useEffect(() => {
//     // Set a timeout to detect if Google Maps fails to load
//     const timeoutId = setTimeout(() => {
//       if (!window.google || !window.google.maps) {
//         console.warn("Google Maps failed to load within timeout period, using fallback")
//         setUseFallback(true)
//         setIsLoading(false)
//       }
//     }, 5000) // 5 second timeout

//     // Check if the Google Maps API is already loaded
//     if (window.google && window.google.maps) {
//       clearTimeout(timeoutId)
//       initializeMap()
//       return () => clearTimeout(timeoutId)
//     }

//     // Load Google Maps API
//     const loadGoogleMapsScript = () => {
//       // Use the environment variable if available, otherwise use a placeholder
//       // This allows the component to work in development without an API key
//       const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

//       // Check if script is already being loaded
//       if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
//         console.log("Google Maps script is already being loaded")
//         return
//       }

//       // Create the script element
//       const script = document.createElement("script")
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization&callback=initMap`
//       script.async = true
//       script.defer = true

//       // Handle script load success
//       script.onload = () => {
//         clearTimeout(timeoutId)
//         console.log("Google Maps script loaded successfully")

//         // Check if the API loaded correctly (no ApiProjectMapError)
//         if (window.google && window.google.maps) {
//           initializeMap()
//         } else {
//           console.error("Google Maps API loaded but maps object not available")
//           setUseFallback(true)
//           setIsLoading(false)
//         }
//       }

//       // Handle script load error
//       script.onerror = (e) => {
//         clearTimeout(timeoutId)
//         console.error("Failed to load Google Maps script", e)
//         setMapError("Failed to load Google Maps API. Using fallback visualization.")
//         setUseFallback(true)
//         setIsLoading(false)
//       }

//       document.head.appendChild(script)
//     }

//     loadGoogleMapsScript()

//     return () => {
//       clearTimeout(timeoutId)
//       // Cleanup markers and routes when component unmounts
//       if (markers.length > 0) {
//         markers.forEach((marker) => marker.setMap(null))
//       }
//       if (routes.length > 0) {
//         routes.forEach((route) => route.setMap(null))
//       }
//       // Clean up script
//       const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
//       if (script) {
//         document.head.removeChild(script)
//       }
//       delete window.initMap
//     }
//   }, [routeType, region, optimizationPriority])

//   // Initialize the map
//   const initializeMap = () => {
//     if (!mapRef.current || !window.google || !window.google.maps) {
//       console.error("Google Maps not available or map ref not ready")
//       setMapError("Google Maps not available. Using fallback visualization.")
//       setUseFallback(true)
//       setIsLoading(false)
//       return
//     }

//     try {
//       console.log("Initializing Google Maps")

//       // Create the map instance centered on the USA
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 39.8283, lng: -98.5795 }, // Center of the USA
//         zoom: 4, // Zoom level to show the entire USA
//         mapTypeControl: true,
//         streetViewControl: false,
//         fullscreenControl: true,
//         zoomControl: true,
//         styles: [
//           {
//             featureType: "administrative",
//             elementType: "geometry",
//             stylers: [{ visibility: "simplified" }],
//           },
//           {
//             featureType: "landscape",
//             stylers: [{ color: "#f5f5f5" }],
//           },
//         ],
//       })

//       setMapInstance(map)
//       setMapLoaded(true)
//       setMapError(null)

//       // Add routes based on routeType and region
//       addRoutes(map, routeType, region, optimizationPriority)
//     } catch (error) {
//       console.error("Error initializing Google Maps:", error)
//       setMapError("Error initializing Google Maps. Using fallback visualization.")
//       setUseFallback(true)
//       setIsLoading(false)
//     }
//   }

//   // Function to add routes to the map
//   function addRoutes(map: any, routeType: string, region: string, optimizationPriority: string) {
//     // Define major cities as distribution centers
//     const cities = [
//       { name: "New York", position: { lat: 40.7128, lng: -74.006 } },
//       { name: "Los Angeles", position: { lat: 34.0522, lng: -118.2437 } },
//       { name: "Chicago", position: { lat: 41.8781, lng: -87.6298 } },
//       { name: "Houston", position: { lat: 29.7604, lng: -95.3698 } },
//       { name: "Phoenix", position: { lat: 33.4484, lng: -112.074 } },
//       { name: "Philadelphia", position: { lat: 39.9526, lng: -75.1652 } },
//       { name: "San Antonio", position: { lat: 29.4241, lng: -98.4936 } },
//       { name: "San Diego", position: { lat: 32.7157, lng: -117.1611 } },
//       { name: "Dallas", position: { lat: 32.7767, lng: -96.797 } },
//       { name: "San Jose", position: { lat: 37.3382, lng: -121.8863 } },
//       { name: "Austin", position: { lat: 30.2672, lng: -97.7431 } },
//       { name: "Jacksonville", position: { lat: 30.3322, lng: -81.6557 } },
//       { name: "Fort Worth", position: { lat: 32.7555, lng: -97.3308 } },
//       { name: "Columbus", position: { lat: 39.9612, lng: -82.9988 } },
//       { name: "Charlotte", position: { lat: 35.2271, lng: -80.8431 } },
//       { name: "San Francisco", position: { lat: 37.7749, lng: -122.4194 } },
//       { name: "Indianapolis", position: { lat: 39.7684, lng: -86.1581 } },
//       { name: "Seattle", position: { lat: 47.6062, lng: -122.3321 } },
//       { name: "Denver", position: { lat: 39.7392, lng: -104.9903 } },
//       { name: "Washington DC", position: { lat: 38.9072, lng: -77.0369 } },
//     ]

//     // Filter cities based on region
//     let filteredCities = cities
//     if (region !== "all") {
//       const regionMap: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
//         northeast: { minLat: 37, maxLat: 47, minLng: -80, maxLng: -67 },
//         southeast: { minLat: 25, maxLat: 37, minLng: -92, maxLng: -75 },
//         midwest: { minLat: 36, maxLat: 49, minLng: -104, maxLng: -80 },
//         southwest: { minLat: 26, maxLat: 37, minLng: -115, maxLng: -94 },
//         west: { minLat: 32, maxLat: 49, minLng: -125, maxLng: -104 },
//       }

//       const regionBounds = regionMap[region]
//       if (regionBounds) {
//         filteredCities = cities.filter((city) => {
//           const { lat, lng } = city.position
//           return (
//             lat >= regionBounds.minLat &&
//             lat <= regionBounds.maxLat &&
//             lng >= regionBounds.minLng &&
//             lng <= regionBounds.maxLng
//           )
//         })
//       }
//     }

//     // Add markers for each city
//     const newMarkers: any[] = []
//     filteredCities.forEach((city) => {
//       const marker = new window.google.maps.Marker({
//         position: city.position,
//         map,
//         title: city.name,
//         icon: {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           scale: 7,
//           fillColor: "#4CAF50",
//           fillOpacity: 0.9,
//           strokeWeight: 2,
//           strokeColor: "#FFFFFF",
//         },
//       })
//       newMarkers.push(marker)
//     })
//     setMarkers(newMarkers)

//     // Create routes between cities
//     const newRoutes: any[] = []
//     for (let i = 0; i < filteredCities.length; i++) {
//       for (let j = i + 1; j < filteredCities.length; j++) {
//         // Skip some connections to avoid overcrowding
//         if (Math.random() > 0.3) continue

//         const city1 = filteredCities[i]
//         const city2 = filteredCities[j]

//         // Determine route color based on routeType
//         let strokeColor = "#3388ff" // Default blue
//         if (routeType === "covid") {
//           strokeColor = "#8800ff" // Purple for COVID
//         } else if (routeType === "flu") {
//           strokeColor = "#00c853" // Green for Flu
//         } else if (routeType === "combined") {
//           // Alternate colors for combined routes
//           strokeColor = Math.random() > 0.5 ? "#8800ff" : "#00c853"
//         }

//         // Adjust line properties based on optimization priority
//         let strokeWeight = 2
//         let strokeOpacity = 0.7

//         if (optimizationPriority === "speed") {
//           strokeWeight = 3
//           strokeOpacity = 0.9
//         } else if (optimizationPriority === "coverage") {
//           strokeWeight = 2
//           strokeOpacity = 0.8
//         } else if (optimizationPriority === "cost") {
//           strokeWeight = 1.5
//           strokeOpacity = 0.6
//         }

//         // Create the polyline
//         const path = [city1.position, city2.position]
//         const polyline = new window.google.maps.Polyline({
//           path,
//           geodesic: true,
//           strokeColor,
//           strokeOpacity,
//           strokeWeight,
//         })
//         polyline.setMap(map)
//         newRoutes.push(polyline)
//       }
//     }
//     setRoutes(newRoutes)
//   }

//   // If we're using the fallback, render the FallbackMap component
//   if (useFallback) {
//     return (
//       <div className="relative w-full h-full bg-gray-100 rounded-md overflow-hidden">
//         <Image
//           src="/images/vaccine-distribution-map.png"
//           alt="Vaccine Distribution Map"
//           layout="fill"
//           objectFit="cover"
//           priority
//         />
//         {mapError && (
//           <div className="absolute bottom-2 right-2">
//             <Alert variant="destructive" className="bg-white/90 border p-2 w-auto">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription className="text-xs">Using static map image (Google Maps API issue)</AlertDescription>
//             </Alert>
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="w-full h-full relative">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md z-10">
//           <div className="text-center text-gray-500">
//             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
//             <p>Loading map data...</p>
//           </div>
//         </div>
//       )}

//       {mapError && (
//         <Alert variant="warning" className="absolute bottom-2 left-2 right-2 z-20 bg-opacity-90 max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Map Warning</AlertTitle>
//           <AlertDescription className="text-xs">{mapError}</AlertDescription>
//         </Alert>
//       )}

//       <div ref={mapRef} className="w-full h-full rounded-md" style={{ minHeight: "600px" }} />

//       {/* Legend */}
//       {mapLoaded && !mapError && (
//         <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-10">
//           <h3 className="text-sm font-medium mb-2">Route Types</h3>
//           <div className="space-y-2">
//             {(routeType === "all" || routeType === "covid") && (
//               <div className="flex items-center">
//                 <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
//                 <span className="text-xs">COVID Routes</span>
//               </div>
//             )}
//             {(routeType === "all" || routeType === "flu") && (
//               <div className="flex items-center">
//                 <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
//                 <span className="text-xs">Flu Routes</span>
//               </div>
//             )}
//             {(routeType === "all" || routeType === "combined") && (
//               <div className="flex items-center">
//                 <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
//                 <span className="text-xs">Combined Routes</span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Add this to make TypeScript happy with the global initMap function
// declare global {
//   interface Window {
//     initMap: () => void
//   }
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import useGoogleMapsLoader from "@/hooks/useGoogleMapsLoader";

// type MapProps = {
//   routeType: string;
//   region: string;
//   optimizationPriority: string;
// };

type MapProps = {
  routeType: string;
  region: string;
  optimizationPriority: string;
  useApiRoutes?: boolean; // NEW
};

export default function GoogleMapComponent({
  routeType,
  region,
  optimizationPriority,
  useApiRoutes,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const loaded = useGoogleMapsLoader(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    ["visualization"]
  );

  // useEffect(() => {
  //   if (!loaded || mapInstance || !mapRef.current) return;

  //   try {
  //     const map = new window.google.maps.Map(mapRef.current, {
  //       center: { lat: 39.8283, lng: -98.5795 },
  //       zoom: 4,
  //       mapTypeControl: true,
  //       streetViewControl: false,
  //       fullscreenControl: true,
  //       zoomControl: true,
  //       styles: [
  //         {
  //           featureType: "administrative",
  //           elementType: "geometry",
  //           stylers: [{ visibility: "simplified" }],
  //         },
  //         {
  //           featureType: "landscape",
  //           stylers: [{ color: "#f5f5f5" }],
  //         },
  //       ],
  //     });

  //     setMapInstance(map);
  //     setMapLoaded(true);
  //     addRoutes(map, routeType, region, optimizationPriority);
  //   } catch (error) {
  //     console.error("Error initializing Google Maps:", error);
  //     setMapError(
  //       "Failed to initialize Google Maps. Using fallback visualization."
  //     );
  //   }

  //   return () => {
  //     markers.forEach((m) => m.setMap(null));
  //     routes.forEach((r) => r.setMap(null));
  //   };
  // }, [loaded, routeType, region, optimizationPriority]);
  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 },
      zoom: 4,
    });
    setMapInstance(map);

    if (useApiRoutes) {
      fetch(
        `/api/routes?type=${routeType}&region=${region}&priority=${optimizationPriority}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.routes) drawApiRoutes(map, data.routes);
        })
        .catch((err) => {
          console.error("Error loading API routes:", err);
          setMapError("Failed to load route data from API.");
        });
    } else {
      addRoutes(map, routeType, region, optimizationPriority); // fallback
    }
  }, [loaded, routeType, region, optimizationPriority]);
  function drawApiRoutes(map: any, routes: any[]) {
    const newMarkers: any[] = [];
    const newRoutes: any[] = [];

    routes.forEach((route) => {
      // Place markers for each endpoint
      [route.origin, route.destination].forEach((loc: any) => {
        const marker = new window.google.maps.Marker({
          position: loc,
          map,
          title: loc.name || loc.city,
        });
        newMarkers.push(marker);
      });

      // Draw line between origin and destination
      const polyline = new window.google.maps.Polyline({
        path: [route.origin, route.destination],
        geodesic: true,
        strokeColor:
          route.type === "vaccination"
            ? "#8800ff"
            : route.type === "testing"
            ? "#00c853"
            : "#3388ff",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      polyline.setMap(map);
      newRoutes.push(polyline);
    });

    setMarkers(newMarkers);
    setRoutes(newRoutes);
  }

  function addRoutes(
    map: any,
    routeType: string,
    region: string,
    optimizationPriority: string
  ) {
    const cities = [
      { name: "New York", position: { lat: 40.7128, lng: -74.006 } },
      { name: "Los Angeles", position: { lat: 34.0522, lng: -118.2437 } },
      { name: "Chicago", position: { lat: 41.8781, lng: -87.6298 } },
      { name: "Houston", position: { lat: 29.7604, lng: -95.3698 } },
      { name: "Phoenix", position: { lat: 33.4484, lng: -112.074 } },
      { name: "Philadelphia", position: { lat: 39.9526, lng: -75.1652 } },
      { name: "San Antonio", position: { lat: 29.4241, lng: -98.4936 } },
      { name: "San Diego", position: { lat: 32.7157, lng: -117.1611 } },
      { name: "Dallas", position: { lat: 32.7767, lng: -96.797 } },
      { name: "San Jose", position: { lat: 37.3382, lng: -121.8863 } },
      { name: "Austin", position: { lat: 30.2672, lng: -97.7431 } },
      { name: "Jacksonville", position: { lat: 30.3322, lng: -81.6557 } },
      { name: "Fort Worth", position: { lat: 32.7555, lng: -97.3308 } },
      { name: "Columbus", position: { lat: 39.9612, lng: -82.9988 } },
      { name: "Charlotte", position: { lat: 35.2271, lng: -80.8431 } },
      { name: "San Francisco", position: { lat: 37.7749, lng: -122.4194 } },
      { name: "Indianapolis", position: { lat: 39.7684, lng: -86.1581 } },
      { name: "Seattle", position: { lat: 47.6062, lng: -122.3321 } },
      { name: "Denver", position: { lat: 39.7392, lng: -104.9903 } },
      { name: "Washington DC", position: { lat: 38.9072, lng: -77.0369 } },
    ];

    let filteredCities = cities;
    if (region !== "all") {
      const regionMap: Record<
        string,
        { minLat: number; maxLat: number; minLng: number; maxLng: number }
      > = {
        northeast: { minLat: 37, maxLat: 47, minLng: -80, maxLng: -67 },
        southeast: { minLat: 25, maxLat: 37, minLng: -92, maxLng: -75 },
        midwest: { minLat: 36, maxLat: 49, minLng: -104, maxLng: -80 },
        southwest: { minLat: 26, maxLat: 37, minLng: -115, maxLng: -94 },
        west: { minLat: 32, maxLat: 49, minLng: -125, maxLng: -104 },
      };

      const regionBounds = regionMap[region];
      if (regionBounds) {
        filteredCities = cities.filter(
          ({ position: { lat, lng } }) =>
            lat >= regionBounds.minLat &&
            lat <= regionBounds.maxLat &&
            lng >= regionBounds.minLng &&
            lng <= regionBounds.maxLng
        );
      }
    }

    const newMarkers: any[] = [];
    filteredCities.forEach((city) => {
      const marker = new window.google.maps.Marker({
        position: city.position,
        map,
        title: city.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#4CAF50",
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#FFFFFF",
        },
      });
      newMarkers.push(marker);
    });
    setMarkers(newMarkers);

    const newRoutes: any[] = [];
    for (let i = 0; i < filteredCities.length; i++) {
      for (let j = i + 1; j < filteredCities.length; j++) {
        if (Math.random() > 0.3) continue;

        const strokeColor =
          routeType === "covid"
            ? "#8800ff"
            : routeType === "flu"
            ? "#00c853"
            : Math.random() > 0.5
            ? "#8800ff"
            : "#00c853";

        const strokeWeight =
          optimizationPriority === "speed"
            ? 3
            : optimizationPriority === "cost"
            ? 1.5
            : 2;
        const strokeOpacity =
          optimizationPriority === "speed"
            ? 0.9
            : optimizationPriority === "cost"
            ? 0.6
            : 0.8;

        const polyline = new window.google.maps.Polyline({
          path: [filteredCities[i].position, filteredCities[j].position],
          geodesic: true,
          strokeColor,
          strokeOpacity,
          strokeWeight,
        });

        polyline.setMap(map);
        newRoutes.push(polyline);
      }
    }

    setRoutes(newRoutes);
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 text-gray-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p>Loading map data...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="relative w-full h-[600px] bg-gray-100 rounded-md overflow-hidden">
        <Image
          src="/images/vaccine-distribution-map.png"
          alt="Vaccine Distribution Map"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-2 right-2">
          <Alert
            variant="destructive"
            className="bg-white/90 border p-2 w-auto"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Using static map image (Google Maps issue)
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div
        ref={mapRef}
        className="w-full h-full rounded-md"
        style={{ minHeight: "600px" }}
      />

      {mapLoaded && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-10">
          <h3 className="text-sm font-medium mb-2">Route Types</h3>
          <div className="space-y-2">
            {(routeType === "all" || routeType === "covid") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs">COVID Routes</span>
              </div>
            )}
            {(routeType === "all" || routeType === "flu") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs">Flu Routes</span>
              </div>
            )}
            {(routeType === "all" || routeType === "combined") && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs">Combined Routes</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
