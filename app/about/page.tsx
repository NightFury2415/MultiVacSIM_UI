import Link from "next/link"
import { Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-emerald-600">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
            <p className="text-xl text-gray-500">
              Meet the developers behind MultiVacSIM, combining expertise in reinforcement learning and healthcare
              informatics to combat infectious diseases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Dev Modi */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-emerald-600">
                  DM
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Dev Modi</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Lead AI Engineer & Co-founder</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Dev specializes in reinforcement learning algorithms and their applications in healthcare. With a
                  background in computer science and artificial intelligence, he leads the development of our AI models
                  for optimizing resource allocation and route planning.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <GraduationCap className="h-4 w-4" />
                    <span>B.S. in Computer Science, San Francisco State University</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="mailto:dev@multivac.com" className="text-gray-500 hover:text-gray-900">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Naing Htet */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
                  NH
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Naing Htet</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Full-Stack Developer & Co-founder</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Naing is an expert in full-stack development with a focus on healthcare applications. He architected
                  the platform's infrastructure and developed the interactive visualization tools that make our complex
                  AI models accessible and actionable for healthcare professionals.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <GraduationCap className="h-4 w-4" />
                    <span>B.S. in Computer Science, San Francisco State University</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="mailto:naing@multivac.com" className="text-gray-500 hover:text-gray-900">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">
              Our Project: Reinforcement Learning for Optimizing Multi-Vaccine Distribution
            </h2>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid grid-cols-5 md:w-fit">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="methodology">Methodology</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="future">Future Work</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Statement & Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Problem:</strong> Static vaccine allocation strategies lack real-time responsiveness.
                    </p>
                    <p>
                      <strong>Goal:</strong> Use reinforcement learning to optimize distribution of COVID-19 and flu
                      vaccines under real-world constraints.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Why It Matters:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reduces hospitalizations & deaths</li>
                      <li>Minimizes vaccine wastage</li>
                      <li>Responds to emerging variants and seasonal surges</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Research Scope</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Dual Disease Simulation:</h3>
                        <p>COVID-19 + Flu</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Dynamic RL-based Allocation at:</h3>
                        <ul className="list-disc pl-5">
                          <li>National level</li>
                          <li>Regional (HHS) level</li>
                          <li>State level</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Comparative Evaluation:</h3>
                      <ul className="list-disc pl-5">
                        <li>Heuristic vs. RL agent performance</li>
                        <li>Random policy baseline</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Literature and Framework Inspiration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>VacSIM:</strong> RL for COVID-19 vaccine allocation using SEIR + DQN + Contextual
                        Bandits
                      </li>
                      <li>
                        <strong>Nature (2024):</strong> Graph RL integration for vaccine routing over social networks
                      </li>
                      <li>
                        <strong>RL Cloud Logistics:</strong> Cloud-based RL for logistics planning
                      </li>
                    </ul>
                    <p className="font-medium mt-2">
                      Takeaway: RL outperforms heuristics; supports flexible, real-time decision-making
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methodology" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Processing Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Challenge:</strong> Messy, heterogeneous public datasets (COVID, flu, mortality, coverage)
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Solution:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Select best .csv per category (not merge all)</li>
                      <li>Standardize column names (e.g., "Jurisdiction" → "State")</li>
                      <li>Normalize data (min-max scaling)</li>
                      <li>Convert to Parquet for memory efficiency (Dask)</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">Preprocessing Plan:</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>
                        Select one high-quality .csv per category (x4) for both COVID-19 and flu to reduce merging
                        complexity.
                      </li>
                      <li>Focus on consistency across time granularity, naming conventions, and missing values.</li>
                      <li>
                        Move away from large-scale joins → simplifying downstream processing and synthetic generation.
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feature Engineering</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="font-semibold mb-2">Features for each state include:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded">Hospitalization rate</div>
                      <div className="bg-gray-50 p-2 rounded">Mortality rate</div>
                      <div className="bg-gray-50 p-2 rounded">Coverage rate</div>
                      <div className="bg-gray-50 p-2 rounded">Supply level</div>
                      <div className="bg-gray-50 p-2 rounded">Public trust estimate</div>
                      <div className="bg-gray-50 p-2 rounded">Infection pressure</div>
                    </div>

                    <div className="mt-4">
                      <p>
                        <strong>Multi-scale design:</strong> National / Region / State features
                      </p>
                      <p>
                        <strong>Data handling:</strong> Synthetic fallback if data missing
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reinforcement Learning Setup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Framework:</strong> OpenAI Gym custom environment
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-2">Agent Types:</h3>
                        <ul className="list-disc pl-5">
                          <li>COVID RL Agent (trained first)</li>
                          <li>Flu RL Agent</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Action Space:</h3>
                        <ul className="list-disc pl-5">
                          <li>Allocate vaccine quantity per region</li>
                          <li>Adjust supply chains</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">State Space:</h3>
                      <p>Vector of dynamic, regional features</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Reward Function:</h3>
                      <ul className="list-disc pl-5">
                        <li>(+) Vaccine uptake</li>
                        <li>(-) Hospitalizations, deaths, wastage</li>
                        <li>Flu seasonality & COVID variant boosters factored in</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Vaccine RL Environment Design:</h3>
                      <ul className="list-disc pl-5">
                        <li>Custom Gym environment models vaccination dynamics over multiple actions</li>
                        <li>State includes infection, supply, coverage, trust, and disease-specific factors</li>
                        <li>Supports both COVID-19 and flu via modular, shared logic</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reward Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Component
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Weight
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">+ Vaccination Rate</td>
                            <td className="px-6 py-4 whitespace-nowrap">×5–6</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">- Hospitalization</td>
                            <td className="px-6 py-4 whitespace-nowrap">×10</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">- Mortality</td>
                            <td className="px-6 py-4 whitespace-nowrap">×15–20</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">- Wastage</td>
                            <td className="px-6 py-4 whitespace-nowrap">×7–8</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">+ Seasonal Bonus</td>
                            <td className="px-6 py-4 whitespace-nowrap">×5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-sm">
                      <p>1) Separate tuning for COVID and FLU.</p>
                      <p>2) Includes clipping and normalization to avoid instability.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Training Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Baseline:</strong> Random agent (to test reward logic)
                      </li>
                      <li>
                        <strong>Q-learning:</strong> First learning model
                      </li>
                      <li>
                        <strong>PPO (planned):</strong> Advanced agent
                      </li>
                    </ul>

                    <h3 className="font-semibold mt-4">Logging:</h3>
                    <ol className="list-decimal pl-5">
                      <li>Episode reward</li>
                      <li>Per-region allocation summary</li>
                      <li>Wastage tracking</li>
                    </ol>

                    <p className="mt-2">CLI interface for testing, with normalization toggle</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Initial Training Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Reward curve:</strong> High variance with raw data, smoothed with normalization
                    </p>

                    <h3 className="font-semibold mt-4">Trends:</h3>
                    <ul className="list-disc pl-5">
                      <li>Oversupply to low-trust = negative rewards</li>
                      <li>Prioritizing high-risk = positive signal</li>
                    </ul>

                    <p className="mt-2">
                      <strong>Challenge:</strong> Feedback loops are asymmetric across regions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Visualizations (Geographic)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>State-level vaccine coverage maps (COVID & Flu)</li>
                      <li>Distribution network graphs showing optimized routing</li>
                      <li>Dijkstra-based vaccine routing with overlay for hubs</li>
                      <li>Google Maps + React frontend demo with paths & nodes</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>UI & Frontend Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Frontend built in:</strong> React + Google Maps API
                    </p>

                    <h3 className="font-semibold mt-4">Visualizes:</h3>
                    <ul className="list-disc pl-5">
                      <li>Hubs and distribution paths</li>
                      <li>Vaccine coverage overlays</li>
                    </ul>

                    <h3 className="font-semibold mt-4">Integration (WIP):</h3>
                    <ul className="list-disc pl-5">
                      <li>Connect simulation backend to frontend interface</li>
                      <li>Real-time updates per episode</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/routes" className="text-emerald-600 hover:text-emerald-800 font-medium">
                      Try the Demo →
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="challenges" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenges Encountered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Inconsistent CSV schemas</li>
                      <li>Memory bottlenecks (30GB+ with synthetic generation)</li>
                      <li>COVID file path bugs in loader</li>
                      <li>High reward noise in early training</li>
                      <li>Manual tuning of reward weights needed</li>
                      <li>Public trust was hardcoded; not learnable yet</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="future" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Future Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Integrate PPO or actor-critic agents</li>
                      <li>Let RL learn routing (vs. Dijkstra/A*) using GNN-based input</li>
                      <li>Dynamic public trust signals based on agent actions</li>
                      <li>Dashboard UI showing simulation metrics per episode</li>
                      <li>Full agent-vs-heuristic performance comparison</li>
                      <li>Test transfer learning between flu and COVID agent policies</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">References</h2>
            <ul className="space-y-2 text-gray-600">
              <li>VacSIM– RL for COVID-19 (ScienceDirect)</li>
              <li>Graph RL for vaccination networks (Nature, 2024)</li>
              <li>RL + Logistics Optimization (IEEE)</li>
              <li>CDC COVID & FluView Data</li>
              <li>Gymnasium (OpenAI)</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-6">
              Interested in learning more about our platform or discussing a potential collaboration?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container py-8 text-center text-sm text-gray-500">© 2025 MultiVacSIM. All rights reserved.</div>
      </footer>
    </div>
  )
}
