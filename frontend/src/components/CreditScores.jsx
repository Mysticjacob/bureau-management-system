import React, { useState, useEffect } from "react";
import axios from "axios";

const CreditScores = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being updated
  const [updatedCreditScore, setUpdatedCreditScore] = useState(""); // State for the new credit score

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
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
    try {
      const response = await axios.put(`http://localhost:5000/users/${editingUser}`, {
        creditScore: updatedCreditScore,
      });
      setUsers(
        users.map((user) =>
          user._id === editingUser ? { ...user, creditScore: response.data.creditScore } : user
        )
      );
      setEditingUser(null); // Reset editing state
      setUpdatedCreditScore(""); // Clear the input field
    } catch (error) {
      console.error("Error updating credit score:", error);
    }
  };

  return (
    <div>
      <h1>Credit Scores</h1>

      {/* Update Credit Score Form */}
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
                <button onClick={() => setEditingUser(user._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditScores;
