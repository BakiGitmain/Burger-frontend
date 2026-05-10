import React, { useState } from "react";
import "./header.css";
import logo from "../assets/logo.png";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // 🔥 ADD
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Header() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const location = useLocation(); // 🔥 ADD
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => {
  return total + item.quantity;
}, 0);
const navigate = useNavigate();
  return (
    <header>
      <div className="header-container">

        <img src={logo} alt="Beka Burger Logo" className="logo" />

        <div className={`nav-links ${open ? "open" : ""}`}>

          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => {
              setActive("home");
              setOpen(false);
            }}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={location.pathname === "/menu" ? "active" : ""}
            onClick={() => {
              setActive("menu");
              setOpen(false);
            }}
          >
            Menu
          </Link>

          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={() => {
              setActive("contact");
              setOpen(false);
            }}
          >
            Contact
          </Link>

          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
            onClick={() => {
              setActive("about");
              setOpen(false);
            }}
          >
            About
          </Link>

        </div>

        <div className="cart-box">
            <button className="chartbtn" onClick={() => navigate("/cart")}>
              <FaCartArrowDown />
              <span className="cart-text">Cart</span>

              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button> 
        </div>

        <div
          className={`menu-icon ${open ? "active" : ""}`}
          onClick={() => setOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
}

export default Header;