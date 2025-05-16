"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

// Sample data for simulation
const simulationStates = [
  {
    day: 1,
    regions: [
      {
        id: "north",
        name: "North",
        cases: 4500,
        vaccinated: 2200,
        allocation: 500,
      },
      {
        id: "south",
        name: "South",
        cases: 6200,
        vaccinated: 3100,
        allocation: 700,
      },
      {
        id: "east",
        name: "East",
        cases: 3800,
        vaccinated: 1900,
        allocation: 400,
      },
      {
        id: "west",
        name: "West",
        cases: 5100,
        vaccinated: 2500,
        allocation: 600,
      },
      {
        id: "central",
        name: "Central",
        cases: 4200,
        vaccinated: 2100,
        allocation: 500,
      },
    ],
  },
  {
    day: 2,
    regions: [
      {
        id: "north",
        name: "North",
        cases: 4300,
        vaccinated: 2700,
        allocation: 600,
      },
      {
        id: "south",
        name: "South",
        cases: 5900,
        vaccinated: 3800,
        allocation: 800,
      },
      {
        id: "east",
        name: "East",
        cases: 3600,
        vaccinated: 2300,
        allocation: 500,
      },
      {
        id: "west",
        name: "West",
        cases: 4800,
        vaccinated: 3100,
        allocation: 700,
      },
      {
        id: "central",
        name: "Central",
        cases: 4000,
        vaccinated: 2600,
        allocation: 600,
      },
    ],
  },
  {
    day: 3,
    regions: [
      {
        id: "north",
        name: "North",
        cases: 4000,
        vaccinated: 3300,
        allocation: 700,
      },
      {
        id: "south",
        name: "South",
        cases: 5500,
        vaccinated: 4600,
        allocation: 900,
      },
      {
        id: "east",
        name: "East",
        cases: 3300,
        vaccinated: 2800,
        allocation: 600,
      },
      {
        id: "west",
        name: "West",
        cases: 4400,
        vaccinated: 3800,
        allocation: 800,
      },
      {
        id: "central",
        name: "Central",
        cases: 3700,
        vaccinated: 3200,
        allocation: 700,
      },
    ],
  },
  {
    day: 4,
    regions: [
      {
        id: "north",
        name: "North",
        cases: 3600,
        vaccinated: 4000,
        allocation: 800,
      },
      {
        id: "south",
        name: "South",
        cases: 5000,
        vaccinated: 5500,
        allocation: 1000,
      },
      {
        id: "east",
        name: "East",
        cases: 3000,
        vaccinated: 3400,
        allocation: 700,
      },
      {
        id: "west",
        name: "West",
        cases: 4000,
        vaccinated: 4600,
        allocation: 900,
      },
      {
        id: "central",
        name: "Central",
        cases: 3400,
        vaccinated: 3900,
        allocation: 800,
      },
    ],
  },
  {
    day: 5,
    regions: [
      {
        id: "north",
        name: "North",
        cases: 3200,
        vaccinated: 4800,
        allocation: 900,
      },
      {
        id: "south",
        name: "South",
        cases: 4500,
        vaccinated: 6500,
        allocation: 1100,
      },
      {
        id: "east",
        name: "East",
        cases: 2700,
        vaccinated: 4100,
        allocation: 800,
      },
      {
        id: "west",
        name: "West",
        cases: 3600,
        vaccinated: 5500,
        allocation: 1000,
      },
      {
        id: "central",
        name: "Central",
        cases: 3100,
        vaccinated: 4700,
        allocation: 900,
      },
    ],
  },
];

export default function SimulationVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  // Draw the simulation visualization
  const drawSimulation = (day: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get current state
    const state = simulationStates[day];
    if (!state) return;

    // Draw title
    ctx.fillStyle = "#111827";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `Day ${state.day} - Vaccine Distribution Simulation`,
      canvas.width / 2,
      30
    );

    // Draw regions
    const regionHeight = 80;
    const padding = 20;
    const startY = 60;

    state.regions.forEach((region, index) => {
      const y = startY + index * (regionHeight + padding);

      // Region background
      ctx.fillStyle = "#f3f4f6";
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(padding, y, canvas.width - padding * 2, regionHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Region name
      ctx.fillStyle = "#111827";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(region.name, padding + 10, y + 20);

      // Cases
      ctx.fillStyle = "#ef4444";
      ctx.font = "12px sans-serif";
      ctx.fillText(
        `Cases: ${region.cases.toLocaleString()}`,
        padding + 10,
        y + 40
      );

      // Vaccinated
      ctx.fillStyle = "#10b981";
      ctx.font = "12px sans-serif";
      ctx.fillText(
        `Vaccinated: ${region.vaccinated.toLocaleString()}`,
        padding + 10,
        y + 60
      );

      // Allocation bar
      const maxAllocation = 1200;
      const barWidth = (canvas.width - padding * 4) * 0.6;
      const barHeight = 15;
      const barX = padding + 200;
      const barY = y + 35;

      // Background bar
      ctx.fillStyle = "#e5e7eb";
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 4);
      ctx.fill();

      // Allocation bar
      const allocationWidth = (region.allocation / maxAllocation) * barWidth;
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.roundRect(barX, barY, allocationWidth, barHeight, 4);
      ctx.fill();

      // Allocation text
      ctx.fillStyle = "#1f2937";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        `Allocation: ${region.allocation} doses`,
        barX + barWidth + 10,
        barY + 10
      );
    });

    // Draw day indicator
    const dayIndicatorWidth =
      (canvas.width - padding * 2) * (day / (simulationStates.length - 1));
    ctx.fillStyle = "#e5e7eb";
    ctx.beginPath();
    ctx.roundRect(
      padding,
      canvas.height - 30,
      canvas.width - padding * 2,
      10,
      5
    );
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.roundRect(padding, canvas.height - 30, dayIndicatorWidth, 10, 5);
    ctx.fill();

    // Day text
    ctx.fillStyle = "#111827";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `Day ${state.day} of ${simulationStates.length}`,
      canvas.width / 2,
      canvas.height - 10
    );
  };

  // Animation loop
  const animate = () => {
    if (currentDay < simulationStates.length - 1) {
      setCurrentDay((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Handle reset
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentDay(0);
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Draw initial state
    drawSimulation(currentDay);

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawSimulation(currentDay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle animation
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(animate, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentDay]);

  // Update visualization when day changes
  useEffect(() => {
    drawSimulation(currentDay);
  }, [currentDay]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaccine Distribution Simulation</CardTitle>
        <CardDescription>
          Reinforcement learning agent allocating vaccines across regions
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="space-y-4">
        <div className="relative bg-gray-50 rounded-md overflow-hidden" style={{ height: "400px" }}>
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={togglePlay} variant="default">
            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent> */}
      <CardContent className="space-y-4">
        {/* Scrollable Canvas Container */}
        <div
          className="relative bg-gray-50 rounded-md overflow-y-auto"
          style={{ height: "400px", maxHeight: "400px" }}
        >
          {/* Canvas with larger height to accommodate all regions */}
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: "600px", minHeight: "600px" }}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2">
          <Button onClick={togglePlay} variant="default">
            {isPlaying ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
