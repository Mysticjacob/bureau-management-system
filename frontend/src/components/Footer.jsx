import React from "react";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "1px 3px", 
      fontSize: "10px",    
    }}>
      <p>
        Contact us at: <a href="mailto:support@cbms.com" style={{ color: "#00bcd4" }}>support@cbms.com</a>
      </p>
    </footer>
  );
};

export default Footer;
