import React from "react";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT - SOCIAL ICONS */}
        <div className="footer-left">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTiktok /></a>
        </div>

        {/* CENTER - COPYRIGHT */}
        <div className="footer-center">
          <p>© 2026 Beka House. All Rights Reserved.</p>
        </div>

        {/* RIGHT - LINKS */}
        <div className="footer-right">
          <a href="/privacy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms">Terms & Conditions</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;