import React, { useEffect, useState } from "react";
import "./contact.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form); // 🔥 later connect to backend
    alert("Message sent!");
    
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Header />
    <div className="contact-page">

      {/* 🔥 HERO */}
      <section className="contact-hero fade-up">
        <h1>Contact <span>Us</span></h1>
        <p>Got questions? Want to order? We’re here for you.</p>
      </section>

      {/* 🔥 CONTENT */}
      <section className="contact-container">

        {/* LEFT INFO */}
        <div className="contact-info fade-up">

          <div className="info-card">
            <h3>📍 Location</h3>
            <p>Adama, Ethiopia</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+251 9XX XXX XXX</p>
          </div>

          <div className="info-card">
            <h3>✉ Email</h3>
            <p>bekaburger@email.com</p>
          </div>

        </div>

        {/* RIGHT FORM */}
        <form className="contact-form fade-up" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Send Message →
          </button>

        </form>

      </section>

    </div>
    <Footer />
    </div>
  );
}

export default Contact;