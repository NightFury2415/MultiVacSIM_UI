"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import GoogleMapComponent from "@/components/google-map-component"
import { useState } from "react"
import Link from "next/link"

export default function RoutesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/images/ai-robot.png" alt="AI Robot" className="h-10 w-10" />
            <span className="text-xl font-bold">MultiVacSIM</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/simulation" className="text-sm font-medium">
              Simulation
            </Link>
            <Link href="/routes" className="text-sm font-medium text-emerald-600">
              Routes
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Optimized Distribution Routes</h1>
            <p className="text-gray-500">
              View and analyze AI-optimized routes for vaccine distribution across different regions.
            </p>
          </div>

          <RouteExplorer />
        </div>
      </main>
    </div>
  )
}

function RouteExplorer() {
  const [routeType, setRouteType] = useState("all")
  const [region, setRegion] = useState("all")
  const [optimizationPriority, setOptimizationPriority] = useState("balanced")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Explorer</CardTitle>
        <CardDescription>Customize and view optimized distribution routes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="route-type">Route Type</Label>
            <Select value={routeType} onValueChange={setRouteType}>
              <SelectTrigger id="route-type">
                <SelectValue placeholder="Select route type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                <SelectItem value="covid">COVID-19 Vaccines</SelectItem>
                <SelectItem value="flu">Flu Vaccines</SelectItem>
                <SelectItem value="combined">Combined Distribution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="northeast">Northeast</SelectItem>
                <SelectItem value="southeast">Southeast</SelectItem>
                <SelectItem value="midwest">Midwest</SelectItem>
                <SelectItem value="southwest">Southwest</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="optimization">Optimization Priority</Label>
            <Select value={optimizationPriority} onValueChange={setOptimizationPriority}>
              <SelectTrigger id="optimization">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="speed">Speed</SelectItem>
                <SelectItem value="coverage">Coverage</SelectItem>
                <SelectItem value="cost">Cost Efficiency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-[600px] relative">
          <GoogleMapComponent routeType={routeType} region={region} optimizationPriority={optimizationPriority} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Total Distance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">3,245 miles</div>
              <p className="text-xs text-gray-500">Optimized from 4,120 miles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Delivery Time</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">18.5 hours</div>
              <p className="text-xs text-gray-500">Reduced by 22%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Coverage</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">94.8%</div>
              <p className="text-xs text-gray-500">Increased by 12.3%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Cost Savings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-gray-500">28.5% reduction</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
