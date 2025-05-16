import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    // Check if API key exists and is not the placeholder
    const hasValidKey = apiKey && apiKey !== "YOUR_ACTUAL_API_KEY_HERE"

    // Return status
    return NextResponse.json({
      status: hasValidKey ? "available" : "unavailable",
      message: hasValidKey ? "Google Maps API key is available" : "Google Maps API key is missing or using placeholder",
      key: hasValidKey ? `${apiKey?.substring(0, 5)}...${apiKey?.substring(apiKey.length - 5)}` : null,
    })
  } catch (error) {
    console.error("Error checking map status:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Error checking map status",
      },
      { status: 500 },
    )
  }
}
