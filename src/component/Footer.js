import React from "react";
import "../styles/FooterStyle.scss";

const currentYear = () => {
  return new Date().getFullYear();
};

const contactLink = () => {
  return (
    <a href="https://simonchow.dev" target="_blank" rel="noopener noreferrer">
      Simon Chow
    </a>
  );
};

// footer has a copyright text and a contact link
const Footer = () => {
  return (
    <div className="footer">
      <span className="footer-copyright">
        @{currentYear()} copywrite-{contactLink()}. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
