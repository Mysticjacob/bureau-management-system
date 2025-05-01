import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanDetails = ({ userId }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loans data from backend (for specific user)
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Use environment variable or default to localhost for development
        const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app";

        const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/loans/user/${userId}`);
        setLoans(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch loan data.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchLoans();
    }
  }, [userId]);

  // Render loading or error state
  if (loading) return <p>Loading loan details...</p>;
  if (error) return <p>{error}</p>;

  // Render loan details table
  return (
    <div>
      <h1>Loan Details</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Loan ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Repayment History</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{loan._id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${loan.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{loan.status}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.repaymentHistory.map((payment, index) => (
                  <div key={index}>
                    {payment.date}: ${payment.amount}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanDetails;
