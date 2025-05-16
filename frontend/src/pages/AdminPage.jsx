import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSun, FaMoon } from 'react-icons/fa';
import CreditScores from '../components/CreditScores';
import '../styles/UsersStyles.css';
import { Link } from "react-router-dom"; 

const UsersPage = () => {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark-mode', !darkMode);
    };

  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Get the API URL from environment variables
  const backendUrl = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/";

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, loansRes] = await Promise.all([
          axios.get(`${backendUrl}users`),
          axios.get(`${backendUrl}loans`),
        ]);
        setUsers(usersRes.data);
        setLoans(loansRes.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  const getUserLoans = (userId) => {
    return loans.filter((loan) => loan.userId?._id === userId);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${backendUrl}users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setUpdateForm({ name: user.name, email: user.email, phone: user.phone, password: user.password || "" });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backendUrl}users/${editingUser}`, updateForm);
      setUsers(users.map((user) => (user._id === editingUser ? response.data : user)));
      setEditingUser(null);
      setUpdateForm({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "password123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  if (!authenticated) {
    return (
       <div className={`home-container ${darkMode ? 'dark' : ''}`}>
          <button className="toggle-dark" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div style={{ marginTop: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
          HOME
        </Link>
      </div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
          <button className="toggle-dark" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
    

      <h1>Users Management</h1>

      {/* Add user form */}
      <form onSubmit={handleAddUser} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Update user form */}
      {editingUser && (
        <form onSubmit={handleUpdateUser} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Name"
            value={updateForm.name}
            onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={updateForm.email}
            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={updateForm.phone}
            onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={updateForm.password}
            onChange={(e) => setUpdateForm({ ...updateForm, password: e.target.value })}
            required
          />
          <button type="submit">Update User</button>
        </form>
      )}

      {/* Users table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Loans</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userLoans = getUserLoans(user._id);
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.password}</td>
                <td>
                  {userLoans.length > 0 ? (
                    userLoans.map((loan) => (
                      <div key={loan._id}>
                        <p>Amount: ${loan.amount}</p>
                        <p>Status: {loan.status}</p>
                        <p>Balance: ${loan.balance}</p>
                        <hr />
                      </div>
                    ))
                  ) : (
                    "No loans"
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  <button onClick={() => handleEditClick(user)} style={{ marginLeft: "5px" }}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CreditScores />
     <div style={{ marginTop: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
          Log Out
        </Link>
      </div>
      </div>
  );
};

export default UsersPage;
