import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';
import axios from "axios";
import '../styles/UsersStyles.css';

const UserPortal = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newLoanAmount, setNewLoanAmount] = useState("");
  const [error, setError] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", paypalEmail: "" });

  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL || "https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

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
      const res = await axios.post(`${backendUrl}/users`, formData);
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
      const res = await axios.get(`${backendUrl}/users`);
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
      const res = await axios.get(`${backendUrl}/loans/user/${userId}`);
      setLoans(res.data);
    } catch (err) {
      setError("Failed to fetch loans.");
      console.error(err);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      const res = await axios.get(`${backendUrl}/transactions/${userId}`);
      setTransactions(res.data);
    } catch (err) {
      setError("Failed to fetch transactions.");
      console.error(err);
    }
  };

  const handleRequestLoan = async (e) => {
    e.preventDefault();
    const amount = Number(newLoanAmount);
    if (!amount || isNaN(amount) || amount > 10000) {
      alert("You qualify for $10000.");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/loans`, {
        userId: user._id,
        amount,
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
    setSelectedLoanId(loanId);
  };

  const handleConfirmPayment = async () => {
    const loan = loans.find((loan) => loan._id === selectedLoanId);
    if (!loan) return alert("Loan not found.");

    if (paymentMethod === "card" && !paymentDetails.cardNumber) {
      return alert("Please enter your card number.");
    }
    if (paymentMethod === "paypal" && !paymentDetails.paypalEmail) {
      return alert("Please enter your PayPal email.");
    }

    try {
      await axios.post(`${backendUrl}/transactions`, {
        userId: user._id,
        loanId: selectedLoanId,
        amount: loan.amount,
        type: "payment",
      });

      await axios.delete(`${backendUrl}/loans/${selectedLoanId}`);
      setLoans(loans.filter((l) => l._id !== selectedLoanId));
      setSelectedLoanId(null);
      alert("Loan paid successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to pay loan.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  if (page === "register") {
    return (
      <div className={`home-container ${darkMode ? 'dark' : ''}`}>
        <button className="toggle-dark" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div style={{ marginTop: "30px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>Home</Link>
        </div>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <button type="submit">Register</button>
          <button type="button" className="link-button" onClick={() => setPage("login")}>
            Already have an account? Login
          </button>
        </form>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className={`home-container ${darkMode ? 'dark' : ''}`}>
        <button className="toggle-dark" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div style={{ marginTop: "30px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>Home</Link>
        </div>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <button type="submit">Login</button>
          <button type="button" className="link-button" onClick={() => setPage("register")}>
            Don't have an account? Register
          </button>
        </form>
      </div>
    );
  }

  if (page === "dashboard" && user) {
    return (
      <div className={`home-container ${darkMode ? 'dark' : ''}`}>
        <button className="toggle-dark" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <h2>Welcome, {user.name}!</h2>
        <h3>Your Information</h3>
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
          <tbody><tr><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td></tr></tbody>
        </table>

        <h3>Your Loans</h3>
        {loans.length === 0 ? <p>No active loans.</p> : (
          <table>
            <thead><tr><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>${loan.amount}</td>
                  <td>{loan.status}</td>
                  <td>
                    <button className="pay-loan-btn" onClick={() => handlePayLoan(loan._id)}>Pay Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedLoanId && (
          <div className="payment-form">
            <h4>Complete Payment</h4>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
            {paymentMethod === "card" && (
              <input
                type="text"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              />
            )}
            {paymentMethod === "paypal" && (
              <input
                type="email"
                placeholder="PayPal Email"
                value={paymentDetails.paypalEmail}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, paypalEmail: e.target.value })}
              />
            )}
            <button onClick={handleConfirmPayment}>Confirm Payment</button>
          </div>
        )}

        <h3>Request a New Loan</h3>
        <form onSubmit={handleRequestLoan}>
          <input
            type="number"
            placeholder="Enter amount (max $10000)"
            value={newLoanAmount}
            onChange={(e) => setNewLoanAmount(e.target.value)}
            required
          />
          <button type="submit">Request Loan</button>
        </form>

        <h3>Your Transactions</h3>
        {transactions.length === 0 ? <p>No transactions yet.</p> : (
          <table>
            <thead><tr><th>Amount</th><th>Type</th><th>Date</th></tr></thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>${transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return null;
};

export default UserPortal;
