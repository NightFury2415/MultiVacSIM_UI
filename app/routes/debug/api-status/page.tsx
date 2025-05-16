"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApiStatusPage() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("loading")
  const [message, setMessage] = useState<string>("")
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    setIsChecking(true)
    try {
      const response = await fetch("/api/map-status")
      const data = await response.json()

      setStatus(data.status)
      setMessage(data.message)
      setApiKey(data.key)
    } catch (error) {
      console.error("Error checking API status:", error)
      setStatus("error")
      setMessage("Failed to check API status")
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/routes/debug" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Debug
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Google Maps API Status</h1>
      <p className="mb-6">This page checks the status of your Google Maps API key and configuration.</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API Key Status</CardTitle>
          <CardDescription>Current status of your Google Maps API key</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
              <p>Checking API key status...</p>
            </div>
          ) : status === "available" ? (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">API Key Available</AlertTitle>
              <AlertDescription className="text-green-700">
                <p>{message}</p>
                {apiKey && (
                  <p className="mt-2">
                    <span className="font-medium">Key:</span> {apiKey}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Issue</AlertTitle>
              <AlertDescription>
                {message}
                <div className="mt-2">
                  <p>To fix this issue:</p>
                  <ol className="list-decimal ml-5 mt-1 space-y-1">
                    <li>Get a Google Maps API key from the Google Cloud Console</li>
                    <li>Add it to your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</li>
                    <li>Make sure the Maps JavaScript API is enabled in your Google Cloud Console</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-4">
            <Button onClick={checkApiStatus} disabled={isChecking} variant="outline" size="sm">
              {isChecking ? "Checking..." : "Check Again"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Reasons why you might be seeing API errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Missing API Key</h3>
              <p className="text-sm text-gray-500">
                The NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set or is using the placeholder value.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Enable the Maps JavaScript API</h3>
              <p className="text-sm text-gray-500">
                Go to the Google Cloud Console, navigate to &quot;APIs &amp; Services&quot; &gt; &quot;Library&quot;,
                search for &quot;Maps JavaScript API&quot;, and enable it.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Check API Key Restrictions</h3>
              <p className="text-sm text-gray-500">
                Your API key might have restrictions that are preventing it from working with your application.
              </p>
            </div>
            <div>
              <h3 className="font-medium">4. Billing Issues</h3>
              <p className="text-sm text-gray-500">There might be billing issues with your Google Cloud account.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Fix</CardTitle>
            <CardDescription>Steps to resolve Google Maps API issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Set Up API Key</h3>
              <p className="text-sm text-gray-500">
                Create a new API key in the Google Cloud Console and add it to your environment variables.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Enable the Maps JavaScript API</h3>
              <p className="text-sm text-gray-500">
                Go to the Google Cloud Console, navigate to &quot;APIs &amp; Services&quot; &gt; &quot;Library&quot;,
                search for &quot;Maps JavaScript API&quot;, and enable it.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Check API Key Restrictions</h3>
              <p className="text-sm text-gray-500">
                In the Google Cloud Console, go to &quot;APIs &amp; Services&quot; &gt; &quot;Credentials&quot;, find
                your API key, and check its restrictions.
              </p>
            </div>
            <div>
              <h3 className="font-medium">4. Enable Billing</h3>
              <p className="text-sm text-gray-500">
                Ensure your Google Cloud project has billing enabled and there are no payment issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Helpful Resources</CardTitle>
          <CardDescription>Links to Google Maps API documentation</CardDescription>
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
