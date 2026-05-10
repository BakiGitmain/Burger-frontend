import React, { useEffect } from "react";
import "./about.css";
import burger from "../assets/Upperburger.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
function About() {

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
    <Header />
    <div className="about-page">

      {/* 🔥 HERO */}
      <section className="about-hero">
        <div className="about-left fade-up">
          <h1>
            About <span>Beka Burger</span>
          </h1>
          <p>
            We dont just make burgers we craft unforgettable experiences.
            Every bite is packed with bold flavor, fresh ingredients, and passion.
          </p>
        </div>

        <div className="about-right fade-up">
          <img src={burger} alt="burger" />
        </div>
      </section>

      {/* 🔥 STORY */}
      <section className="about-story fade-up">
        <h2>Our Story</h2>
        <p>
          Beka Burger started with one goal — to create the most legendary burger
          experience in Ethiopia. From hand-picked ingredients to perfectly grilled
          patties, every detail matters.  
          <br /><br />
          We believe food should be bold, juicy, and unforgettable.
        </p>
      </section>

      {/* 🔥 FEATURES */}
      <section className="about-features">

        <div className="feature-card fade-up">
          <h3>🔥 Fresh Ingredients</h3>
          <p>We use only the freshest and highest quality ingredients.</p>
        </div>

        <div className="feature-card fade-up">
          <h3>🍔 Premium Taste</h3>
          <p>Our burgers are crafted for maximum flavor and satisfaction.</p>
        </div>

        <div className="feature-card fade-up">
          <h3>⚡ Fast Delivery</h3>
          <p>Hot and fresh — delivered straight to your door.</p>
        </div>

      </section>

      {/* 🔥 STATS */}
      <section className="about-stats fade-up">

        <div className="stat">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h2>50+</h2>
          <p>Burger Variations</p>
        </div>

        <div className="stat">
          <h2>5⭐</h2>
          <p>Customer Rating</p>
        </div>

      </section>

    </div>
    <Footer />
    </div>
  );
}

export default About;