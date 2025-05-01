import React, { useState, useEffect } from "react";
import "../styles/Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app";
        const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/users`);
        const users = response.data;

        const labels = users.map((user) => user.name || `User ${user._id}`);
        const data = users.map((user) => user.creditScore ?? 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Credit Score Trend",
              data,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching credit score data:", error);
      }
    };

    fetchTrendData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Credit Score Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Credit Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Users",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Charts;
