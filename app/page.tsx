import Link from "next/link"
import { ArrowRight, BarChart3, Map, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
            <Link href="/routes" className="text-sm font-medium">
              Routes
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Reinforcement Learning for Multi-Vaccine Distribution
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Our platform uses advanced AI to optimize COVID-19 and flu vaccine distribution strategies, resource
                  allocation, and route planning to combat infectious diseases more effectively.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      View Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/simulation">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Try Simulation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                  <img
                    src="/images/reinforcement-learning-diagram.png"
                    alt="Reinforcement Learning Diagram"
                    className="object-contain w-full h-full bg-white p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful AI-Driven Solutions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines reinforcement learning with real-world data to create effective strategies for
                  managing infectious diseases.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 text-emerald-600 mb-2" />
                  <CardTitle>Reinforcement Learning</CardTitle>
                  <CardDescription>Advanced AI algorithms that learn and improve strategies over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our models continuously learn from new data, adapting strategies to changing conditions and
                    improving outcomes for both COVID-19 and flu vaccine distribution.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/simulation">
                    <Button variant="ghost" size="sm">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Map className="h-10 w-10 text-emerald-600 mb-2" />
                  <CardTitle>Route Optimization</CardTitle>
                  <CardDescription>Google Maps integration for visualizing and optimizing routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Visualize optimal routes for vaccine distribution at national, regional, and state levels to
                    maximize coverage and minimize wastage.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/routes">
                    <Button variant="ghost" size="sm">
                      View Routes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-emerald-600 mb-2" />
                  <CardTitle>Data Visualization</CardTitle>
                  <CardDescription>Comprehensive dashboards with real-time analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Interactive charts and maps to monitor disease spread, vaccine allocation, and the effectiveness of
                    interventions for both COVID-19 and seasonal flu.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      View Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Our Approach Matters</h2>
                <p className="text-gray-500 md:text-xl">
                  Static vaccine allocation strategies lack real-time responsiveness. Our reinforcement learning
                  approach provides:
                </p>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Reduced Hospitalizations & Deaths</h3>
                      <p className="text-sm text-gray-500">
                        Optimized distribution strategies that target high-risk areas first
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Minimized Vaccine Wastage</h3>
                      <p className="text-sm text-gray-500">
                        Intelligent allocation that considers supply chain constraints and local demand
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Responsive to Emerging Threats</h3>
                      <p className="text-sm text-gray-500">
                        Adapts to new variants and seasonal surges with real-time data integration
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Multi-level Optimization</h3>
                      <p className="text-sm text-gray-500">
                        Works at national, regional, and state levels for comprehensive coverage
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/about">
                  <Button variant="outline">Learn More About Our Technology</Button>
                </Link>
              </div>
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/images/vaccine-distribution-map.png"
                  alt="Vaccine distribution map showing optimized routes"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Optimize Your Vaccine Distribution Strategy?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                  Start using our platform today to improve your COVID-19 and flu management approaches.
                </p>
              </div>
              <Link href="/dashboard">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <img src="/images/ai-robot.png" alt="AI Robot" className="h-6 w-6" />
              <span className="text-lg font-bold">MultiVacSIM</span>
            </div>
            <p className="text-sm text-gray-500">
              Advanced reinforcement learning solutions for COVID-19 and flu vaccine distribution.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/simulation" className="text-sm text-gray-500 hover:text-gray-900">
                    Simulation
                  </Link>
                </li>
                <li>
                  <Link href="/routes" className="text-sm text-gray-500 hover:text-gray-900">
                    Routes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© 2025 MultiVacSIM. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
