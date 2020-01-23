import React from "react";
import "../styles/FooterStyle.scss";

const currentYear = () => {
  return new Date().getFullYear();
};

const contactLink = () => {
  return (
    <a href="https://simonchow.dev" target="_blank" rel="noopener noreferrer">
      simonchow.dev
    </a>
  );
};

// footer has a copyright text and a contact link
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-copyright">
        @{currentYear()} copywrite-simon chow. All rights reserved
      </div>
      <div className="footer-contact">Contact me: visit {contactLink()}</div>
    </div>
  );
};

export default Footer;
