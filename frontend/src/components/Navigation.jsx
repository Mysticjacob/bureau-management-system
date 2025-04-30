import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import '../styles/Navbar.css';

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/users">Admin Dashboard</Link>
      <Link to="/loans">User Dashboard</Link>
      
      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navigation;
