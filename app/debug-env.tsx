"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function DebugEnv() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlaceholder, setIsPlaceholder] = useState(false)

  useEffect(() => {
    try {
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      setApiKey(key || "Not found")

      if (key === "YOUR_ACTUAL_API_KEY_HERE") {
        setIsPlaceholder(true)
      }
    } catch (err) {
      setError("Error accessing environment variable")
      console.error(err)
    }
  }, [])

  return (
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

            <div className="text-sm text-gray-500 mt-2 space-y-2">
              <p>If you're still seeing the "ApiProjectMapError" despite having an API key, you need to:</p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Make sure the Maps JavaScript API is enabled in your Google Cloud Console</li>
                <li>Check that your API key doesn't have any restrictions that would prevent it from working</li>
                <li>Verify that your Google Cloud project has billing enabled</li>
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
