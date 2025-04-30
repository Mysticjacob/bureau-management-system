import React, { useState, useEffect } from "react";
import '../styles/Charts.css';
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
  const [chartData, setChartData] = useState({
    labels: [], // Dynamically updated with user names or IDs
    datasets: [
      {
        label: "Credit Score Trend",
        data: [], // Dynamically updated with credit scores
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
    ],
  });

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        // Fetch users from the backend
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;

        // Extract data for the chart
        const labels = users.map((user) => user.name || `User ${user._id}`);
        const data = users.map((user) => user.creditScore || 0);

        // Update the chart data
        setChartData({
          labels,
          datasets: [
            {
              label: "Credit Score Trend",
              data,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching credit score data:", error);
      }
    };

    fetchTrendData();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Credit Score Trends",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Charts;
