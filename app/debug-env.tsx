"use client"

import { useEffect, useState } from "react"

export default function DebugEnv() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      setApiKey(key || "Not found")
    } catch (err) {
      setError("Error accessing environment variable")
      console.error(err)
    }
  }, [])

  return (
    <div className="p-4 bg-gray-100 rounded-md my-4">
      <h2 className="text-lg font-bold mb-2">Environment Variable Debug</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <p>
            <strong>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:</strong>{" "}
            {apiKey
              ? apiKey.length > 10
                ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}`
                : apiKey
              : "Loading..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {apiKey && apiKey !== "Not found"
              ? "API key is present. If the map is not loading, check for console errors."
              : "API key is missing. Please add it to your environment variables."}
          </p>
        </div>
      )}
    </div>
  )
}
