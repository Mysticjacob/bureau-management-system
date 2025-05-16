import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';
import Charts from "./Charts";
import axios from "axios";

const Dashboard = () => {
   const [darkMode, setDarkMode] = useState(false);
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
      };

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoans: 0,
    averageCreditScore: 0,
  });
  const [creditScores, setCreditScores] = useState([]);
 const navigate = useNavigate();
  // Fetch stats function
  const fetchStats = async () => {
    try {
      // Use environment variable or default to localhost for development
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app";

      const usersResponse = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/users`);
      const loansResponse = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/loans`);

      const totalUsers = usersResponse.data.length;
      const totalLoans = loansResponse.data.length;

      const totalCreditScore = usersResponse.data.reduce(
        (sum, user) => sum + (user.creditScore || 0),
        0
      );
      const averageCreditScore = totalUsers > 0 ? totalCreditScore / totalUsers : 0;

      setStats({
        totalUsers,
        totalLoans,
        averageCreditScore: Math.round(averageCreditScore),
      });

      // Collect all credit scores
      setCreditScores(usersResponse.data.map((user) => user.creditScore || 0));
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchStats(); // Fetch stats on component mount
  }, []);

  return (
     <div className={`home-container ${darkMode ? 'dark' : ''}`}>
              <button className="toggle-dark" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

      <h1>Overview</h1>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", textAlign: "center" }}>
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "20px", textAlign: "center" }}>
          <h2>Total Loans</h2>
          <p>{stats.totalLoans}</p>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "20px", textAlign: "center" }}>
          <h2>Average Credit Score</h2>
          <p>{stats.averageCreditScore}</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Credit Score Trends</h2>
        <Charts creditScores={creditScores} />
      </div>
          <div style={{ marginTop: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
