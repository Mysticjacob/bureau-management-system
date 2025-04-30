import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/UsersStyles.css';

const UserPortal = () => {
  const [page, setPage] = useState("login"); 
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newLoanAmount, setNewLoanAmount] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchUserLoans(storedUser._id);
      fetchUserTransactions(storedUser._id);
      setPage("dashboard");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users", formData);
      alert("Registration successful!");
      setUser(res.data);
      fetchUserLoans(res.data._id);
      fetchUserTransactions(res.data._id);
      localStorage.setItem("user", JSON.stringify(res.data)); 
      setPage("dashboard");
      setFormData({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      setError("Error during registration. Please try again.");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/users");
      const foundUser = res.data.find(
        (u) =>
          u.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
          u.password === formData.password
      );
      if (foundUser) {
        setUser(foundUser);
        fetchUserLoans(foundUser._id);
        fetchUserTransactions(foundUser._id);
        localStorage.setItem("user", JSON.stringify(foundUser)); 
        setPage("dashboard");
      } else {
        setError("Invalid email or password!");
      }
    } catch (err) {
      setError("Error during login. Please try again.");
      console.error(err);
    }
  };

  const fetchUserLoans = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/loans/user/${userId}`);
      setLoans(res.data);
    } catch (err) {
      setError("Failed to fetch loans.");
      console.error("Failed to fetch loans.", err);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/transactions/${userId}`);
      setTransactions(res.data);
    } catch (err) {
      setError("Failed to fetch transactions.");
      console.error("Failed to fetch transactions.", err);
    }
  };

  const handleRequestLoan = async (e) => {
    e.preventDefault();
    if (!newLoanAmount || isNaN(newLoanAmount)) {
      alert("Please enter a valid amount.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/loans", {
        userId: user._id,
        amount: Number(newLoanAmount),
      });
      setLoans([...loans, res.data]);
      setNewLoanAmount("");
      alert("Loan requested and approved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to request loan.");
    }
  };

  const handlePayLoan = async (loanId) => {
    try {
      const loan = loans.find((loan) => loan._id === loanId);
      if (!loan) return alert("Loan not found.");

      await axios.post("http://localhost:5000/transactions", {
        userId: user._id,
        loanId: loanId,
        amount: loan.amount,
        type: "payment",
      });

      await axios.delete(`http://localhost:5000/loans/${loanId}`);
      setLoans(loans.filter((loan) => loan._id !== loanId));
      alert("Loan paid successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to pay loan.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    localStorage.removeItem("user");
  };

  if (page === "register") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          /><br /><br />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          /><br /><br />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          /><br /><br />
          <button type="submit">Register</button>
          <p>Already have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setPage("login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          /><br /><br />
          <button type="submit">Login</button>
          <p>Don't have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setPage("register")}>
              Register
            </span>
          </p>
        </form>
      </div>
    );
  }

  if (page === "dashboard" && user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user.name}!</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>

        <h3>Your Loans</h3>
        {loans.length === 0 ? (
          <p>No active loans.</p>
        ) : (
          <ul>
            {loans.map((loan) => (
              <li key={loan._id}>
                Amount: ${loan.amount} - Status: {loan.status}
                <button onClick={() => handlePayLoan(loan._id)} style={{ marginLeft: "10px" }}>
                  Pay Now
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3>Request a New Loan</h3>
        <form onSubmit={handleRequestLoan}>
          <input
            type="number"
            placeholder="Enter amount"
            value={newLoanAmount}
            onChange={(e) => setNewLoanAmount(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>Request Loan</button>
        </form>

        <h3>Your Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                ${transaction.amount} - {transaction.type} on {new Date(transaction.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}

        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return null;
};

export default UserPortal;
