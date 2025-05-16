import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/AdminPage";
import UserPortal from "./pages/UserPortalPage";
import Dashboard from "./components/Dashboard";
import CreditScores from "./components/CreditScores";
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/loans" element={<UserPortal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creditscores" element={<CreditScores />} />
      </Routes>
    </Router>
  );
}

export default App;
