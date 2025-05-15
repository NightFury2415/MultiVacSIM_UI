import DebugEnv from "@/app/debug-env"

export default function DebugPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <p className="mb-4">
        This page helps debug issues with environment variables. Check if your Google Maps API key is properly set.
      </p>
      <DebugEnv />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Verify that you've added the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your Vercel project settings</li>
          <li>Make sure you've redeployed your application after adding the environment variable</li>
          <li>Check that your API key is valid and has the Maps JavaScript API enabled</li>
          <li>
            Ensure your API key doesn't have any restrictions that would prevent it from working in your environment
          </li>
          <li>Check the browser console for any specific error messages</li>
        </ol>
      </div>
    </div>
  )
}
