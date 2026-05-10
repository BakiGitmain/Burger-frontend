import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./Privacy.css";

function Privacy() {
  return (
    <div>
      <Header />

      <section className="privacy-page">
        <div className="privacy-container">

          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-sub">
            Your privacy is important to us. This page explains how we handle your data.
          </p>

          {/* SECTION */}
          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              When you place an order, we may collect your name, phone number,
              address, and location details. This information is necessary to
              process and deliver your order.
            </p>
          </div>

          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information only to:
            </p>
            <ul>
              <li>Process and deliver your orders</li>
              <li>Contact you for order confirmation</li>
              <li>Improve our services</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>3. Data Protection</h2>
            <p>
              We take reasonable measures to protect your personal data and
              prevent unauthorized access. Your information is not shared with
              third parties except when necessary to complete your order.
            </p>
          </div>

          <div className="privacy-section">
            <h2>4. No Selling of Data</h2>
            <p>
              We do NOT sell, rent, or trade your personal information to any
              third party. Your data stays private within our system.
            </p>
          </div>

          <div className="privacy-section">
            <h2>5. Cookies & Tracking</h2>
            <p>
              Our website may use basic cookies to improve user experience, such
              as remembering your preferences. We do not use invasive tracking.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. User Responsibility</h2>
            <p>
              Please ensure the information you provide is accurate. Incorrect
              data may result in failed deliveries or delays.
            </p>
          </div>

          <div className="privacy-section">
            <h2>7. Changes to Policy</h2>
            <p>
              We may update this Privacy Policy at any time. Changes will be
              reflected on this page.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Privacy;