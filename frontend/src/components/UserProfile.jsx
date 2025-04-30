import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/${user._id');
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle form submission for updating user data
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, user);
      alert("User details updated successfully!");
    } catch (err) {
      alert("Failed to update user details.");
    }
  };

  // Render loading or error state
  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>{error}</p>;

  // Render user profile form
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label><br />
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
