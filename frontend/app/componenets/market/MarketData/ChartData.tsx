// "use client"
//
//
// import {
//   Chart,
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   TimeScale,
// } from "chart.js";
// import "chartjs-adapter-date-fns"; // Adapter for parsing dates
// import { useEffect, useRef } from "react";
//
// export default function ChartData({ chartData }) {
//   const labels = chartData.map((data) => data.end); // String date array
//   const prices = chartData.map((data) => Number(data.close));
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   let color
//   if (prices[0] <= prices[prices.length - 1]) {
//     color = true
//   } else {
//     color = false
//   }
//   useEffect(() => {
//     Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale);
//
//     if (canvasRef.current) {
//       new Chart(canvasRef.current, {
//         type: "line",
//         data: {
//           labels: labels, // Dates as strings
//           datasets: [
//             {
//               label: "Price",
//               data: prices,
//               borderColor: color ? "#00FF0D" : "#f70505",
//               borderWidth: 2,
//               tension: 0.4,
//               pointRadius: 0,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               enabled: false,
//             },
//           },
//           scales: {
//             x: {
//               type: "time", // Use time scale
//               time: {
//                 unit: "hour", // Customize units (e.g., 'hour', 'day')
//                 displayFormats: {
//                   hour: "HH:mm", // Customize time format
//                 },
//               },
//               display: false, // Hide the x-axis
//             },
//             y: {
//               display: false,
//             },
//           },
//         },
//       });
//     }
//
//     return () => {
//       if (canvasRef.current) {
//         Chart.getChart(canvasRef.current)?.destroy();
//       }
//     };
//   }, [labels, prices]);
//
//   return <canvas ref={canvasRef} className="h-11"></canvas>;
// }
//





"use client";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Adapter for parsing dates
import { useEffect, useRef } from "react";

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale); // Register globally

export default function ChartData({ chartData }) {
  const labels = chartData.map((data) => data.end); // String date array
  const prices = chartData.map((data) => Number(data.close));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const color = prices[0] <= prices[prices.length - 1] ? "#00FF0D" : "#f70505";

  useEffect(() => {
    if (canvasRef.current) {
      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: labels, // Dates as strings
          datasets: [
            {
              label: "Price",
              data: prices,
              borderColor: color,
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          scales: {
            x: {
              type: "time", // Use time scale
              time: {
                unit: "hour", // Customize units (e.g., 'hour', 'day')
                displayFormats: {
                  hour: "HH:mm", // Customize time format
                },
              },
              display: false, // Hide the x-axis
            },
            y: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      // Cleanup on unmount or dependencies change
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, prices, color]);

  return (
    <div className="flex justify-center items-center h-16 w-20">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
