import React, { useState, useEffect } from "react";
import Charts from "./Charts";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoans: 0,
    averageCreditScore: 0,
  });
  const [creditScores, setCreditScores] = useState([]);

  const fetchStats = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:5000/users");
      const loansResponse = await axios.get("http://localhost:5000/loans");

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

  useEffect(() => {
    fetchStats(); // Fetch stats on component mount
  }, []);

  return (
    <div>
      <h1>Dashboard Overview</h1>
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
    </div>
  );
};

export default Dashboard;
