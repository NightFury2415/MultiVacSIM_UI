"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DebugPage() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlaceholder, setIsPlaceholder] = useState(false)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Check API key
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      setApiKey(key || "Not found")

      if (key === "YOUR_ACTUAL_API_KEY_HERE") {
        setIsPlaceholder(true)
      }

      // Try to load Google Maps
      if (key && key !== "YOUR_ACTUAL_API_KEY_HERE") {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`
        script.async = true
        script.defer = true

        script.onload = () => {
          console.log("Google Maps script loaded successfully")
          setGoogleMapsLoaded(true)
        }

        script.onerror = (e) => {
          console.error("Failed to load Google Maps script", e)
          setLoadingError("Failed to load Google Maps script. This could be due to an invalid API key or disabled API.")
        }

        document.head.appendChild(script)
      }
    } catch (err) {
      setError("Error accessing environment variable")
      console.error(err)
    }
  }, [])

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/routes" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Routes
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Google Maps API Debug</h1>
      <p className="mb-6">
        This page helps debug issues with the Google Maps JavaScript API. The "ApiProjectMapError" typically occurs when
        the Maps JavaScript API isn't properly enabled in your Google Cloud project or there are issues with your API
        key configuration.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variable Status</CardTitle>
          <CardDescription>Checking your Google Maps API key configuration</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : apiKey === "Not found" ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Missing</AlertTitle>
              <AlertDescription>
                No Google Maps API key found in your environment variables. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your
                environment variables.
              </AlertDescription>
            </Alert>
          ) : isPlaceholder ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Using Placeholder API Key</AlertTitle>
              <AlertDescription>
                You're using the placeholder API key "YOUR_ACTUAL_API_KEY_HERE". Replace it with your actual Google Maps
                API key.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">API Key Found</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your Google Maps API key is present in the environment variables.
                </AlertDescription>
              </Alert>

              <div>
                <p className="font-medium">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:</p>
                <p className="text-sm text-gray-500 mt-1">
                  {apiKey && apiKey.length > 10
                    ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}`
                    : apiKey}
                </p>
              </div>

              {googleMapsLoaded ? (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Google Maps Loaded Successfully</AlertTitle>
                  <AlertDescription className="text-green-700">
                    The Google Maps JavaScript API was loaded successfully. If you're still having issues, check the
                    console for errors.
                  </AlertDescription>
                </Alert>
              ) : loadingError ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Google Maps Loading Error</AlertTitle>
                  <AlertDescription>{loadingError}</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Google Maps Loading Status</AlertTitle>
                  <AlertDescription>
                    Attempting to load Google Maps JavaScript API. Check the console for errors.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Common Causes</CardTitle>
            <CardDescription>Reasons why you might be seeing this error</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Maps JavaScript API Not Enabled</h3>
              <p className="text-sm text-gray-500">
                The Maps JavaScript API might not be enabled in your Google Cloud project.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. API Key Restrictions</h3>
              <p className="text-sm text-gray-500">
                Your API key might have restrictions that are preventing it from working with your application.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Billing Issues</h3>
              <p className="text-sm text-gray-500">There might be billing issues with your Google Cloud account.</p>
            </div>
            <div>
              <h3 className="font-medium">4. Incorrect API Key</h3>
              <p className="text-sm text-gray-500">
                The API key you're using might be incorrect or might belong to a different project.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Fix</CardTitle>
            <CardDescription>Steps to resolve the API Project Map Error</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Enable the Maps JavaScript API</h3>
              <p className="text-sm text-gray-500">
                Go to the Google Cloud Console, navigate to "APIs &amp; Services" &gt; "Library", search for "Maps
                JavaScript API", and enable it.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Check API Key Restrictions</h3>
              <p className="text-sm text-gray-500">
                In the Google Cloud Console, go to "APIs & Services" > "Credentials", find your API key, and check its
                restrictions. Make sure HTTP referrers include your application's domain.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Verify Billing</h3>
              <p className="text-sm text-gray-500">
                Ensure your Google Cloud project has billing enabled and there are no payment issues.
              </p>
            </div>
            <div>
              <h3 className="font-medium">4. Create a New API Key</h3>
              <p className="text-sm text-gray-500">
                If all else fails, try creating a new API key specifically for the Maps JavaScript API.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Google Maps API Documentation</CardTitle>
          <CardDescription>Helpful resources for troubleshooting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <a
              href="https://developers.google.com/maps/documentation/javascript/error-messages#api-project-map-error"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Maps JavaScript API Error Messages
            </a>
            <p className="text-sm text-gray-500">Official documentation on API error messages</p>
          </div>
          <div>
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Getting an API Key
            </a>
            <p className="text-sm text-gray-500">How to properly set up an API key for Google Maps</p>
          </div>
          <div>
            <a
              href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Enable Maps JavaScript API
            </a>
            <p className="text-sm text-gray-500">
              Direct link to enable the Maps JavaScript API in Google Cloud Console
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
