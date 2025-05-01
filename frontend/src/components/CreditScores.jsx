import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app";

const CreditScores = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedCreditScore, setUpdatedCreditScore] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle update credit score
  const handleUpdateCreditScore = async (e) => {
    e.preventDefault();
    if (!updatedCreditScore) return;

    try {
      const response = await axios.put(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/users/${editingUser}`, {
        creditScore: updatedCreditScore,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser ? { ...user, creditScore: response.data.creditScore } : user
        )
      );

      setEditingUser(null);
      setUpdatedCreditScore("");
    } catch (error) {
      console.error("Error updating credit score:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Credit Scores</h1>

      {editingUser && (
        <form onSubmit={handleUpdateCreditScore} style={{ marginBottom: "20px" }}>
          <input
            type="number"
            placeholder="New Credit Score"
            value={updatedCreditScore}
            onChange={(e) => setUpdatedCreditScore(e.target.value)}
            required
          />
          <button type="submit">Update Credit Score</button>
          <button type="button" onClick={() => setEditingUser(null)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </form>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>User ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Credit Score</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user._id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.creditScore}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => {
                  setEditingUser(user._id);
                  setUpdatedCreditScore(user.creditScore || "");
                }}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditScores;
