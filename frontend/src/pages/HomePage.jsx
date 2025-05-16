import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      <button className="toggle-dark" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <header className="home-header">
        <div className="welcome-box">
          <h1>Welcome to the Credit Bureau Management System</h1>
        </div>
        <p>
          Your financial trust starts here. We connect lenders and borrowers with powerful insights
          and reliable data to drive better credit decisions.
        </p>
      </header>

      <hr />

      <section className="user-actions">
        <div className="action-card borrower" onClick={() => navigate('/loans')} tabIndex={0} role="button" aria-pressed="false" >
          <h2>Wanna get a loan?</h2>
          <p>Click here to explore loan options and apply in our User Portal.</p>
          <button>Sign-In</button>
        </div>

        <div className="action-card admin" onClick={() => navigate('/users')} tabIndex={0} role="button" aria-pressed="false" >
          <h2>Admin Portal</h2>
          <p>Manage users, loans, and system settings here.</p>
          <button>Go to Admin</button>
        </div>
        <div className="action-card admin" onClick={() => navigate('/dashboard')} tabIndex={0} role="button" aria-pressed="false" >
          <h2>Analysis</h2>

          <button>Charts</button>
        </div>
      </section>

      <hr />

      <section className="about-section">
        <h2>Understanding Credit Bureaus</h2>
        <p>
          Ever wondered how banks decide if you're eligible for a loan? That's where credit bureaus come in.
          They gather, manage, and provide credit-related information—like your loan history and payment habits—
          helping lenders assess your creditworthiness with confidence.
        </p>
      </section>

      <hr />

      <section className="importance-section">
        <h2>Why It Matters</h2>
        <p>
          A strong credit system doesn’t just protect banks—it empowers individuals. Accurate credit reports:
        </p>
        <ul>
          <li>Help reduce the risk of lending to high-risk borrowers</li>
          <li>Allow borrowers to access fair loan terms based on their history</li>
          <li>Promote financial responsibility and transparency</li>
        </ul>
      </section>

      <hr />

      <section className="learn-more">
        <h2>Learn More About Loans and Credit Benefits</h2>
        <ul>
          <li>
            <a href="https://www.investopedia.com/terms/l/loan.asp" target="_blank" rel="noopener noreferrer">
              What is a Loan? – Investopedia
            </a>
          </li>
          <li>
            <a href="https://www.nerdwallet.com/best/loans" target="_blank" rel="noopener noreferrer">
              Types of Loans – NerdWallet
            </a>
          </li>
          <li>
            <a href="https://www.bankrate.com/loans/" target="_blank" rel="noopener noreferrer">
              Loan Basics – Bankrate
            </a>
          </li>
          <li>
            <a href="https://www.experian.com/blogs/news/2018/06/benefits-of-a-good-credit-score/" target="_blank" rel="noopener noreferrer">
              Benefits of a Good Credit Score – Experian
            </a>
          </li>
          <li>
            <a href="https://www.equifax.com/personal/education/credit/score/why-good-credit-matters/" target="_blank" rel="noopener noreferrer">
              Why Good Credit Matters – Equifax
            </a>
          </li>
        </ul>
      </section>

      <hr />

      <section className="call-to-action">
        <h2>Join the Journey to Smarter Credit</h2>
        <p>
          Whether you're a lender, analyst, or everyday consumer, our system gives you the tools
          to make informed financial decisions. Start exploring, stay informed, and shape a better financial future.
        </p>
      </section>

      <hr />

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Credit Bureau System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
