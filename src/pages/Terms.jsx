import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./Terms.css";

function Terms() {
  return (
    <div>
      <Header />

      <section className="terms-page">
        <div className="terms-container">

          <h1 className="terms-title">Terms & Conditions</h1>
          <p className="terms-sub">
            Please read these terms carefully before placing an order.
          </p>

          {/* SECTION */}
          <div className="terms-section">
            <h2>1. General Use</h2>
            <p>
              By using Beka Burger, you agree to use the website responsibly and
              not misuse our services. All users must provide accurate
              information when placing orders.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Orders & Payments</h2>
            <p>
              All orders placed through our platform are considered real and
              binding. Customers must ensure that their order details, phone
              number, and delivery information are correct.
            </p>
          </div>

          <div className="terms-section warning">
            <h2>3. Fake / Joke Orders 🚫</h2>
            <p>
              Placing fake, prank, or non-serious orders is strictly prohibited.
              This includes ordering without the intention of receiving or
              paying for the food.
            </p>

            <p className="highlight">
              ⚠️ Users who place fake orders may be blocked from using the
              service permanently.
            </p>

            <p>
              We take our business seriously, and every order impacts real
              operations, staff, and resources.
            </p>
          </div>

          <div className="terms-section">
            <h2>4. Delivery Policy</h2>
            <p>
              Delivery times may vary depending on location and demand. We aim to
              deliver within the estimated time but delays may occur due to
              traffic or high order volume.
            </p>
          </div>

          <div className="terms-section">
            <h2>5. Cancellations</h2>
            <p>
              Orders cannot be canceled once they are confirmed and being
              prepared. Please review your order carefully before checkout.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. User Responsibility</h2>
            <p>
              Users are responsible for providing correct contact information
              and being available to receive their orders.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Changes to Terms</h2>
            <p>
              We may update these terms at any time without prior notice. It is
              your responsibility to review them periodically.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Terms;