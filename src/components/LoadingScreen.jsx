import React from "react";
import "./LoadingScreen.css";
import { FaHamburger } from "react-icons/fa";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">

        <FaHamburger className="loading-icon" />

        <h1 className="loading-title">Beka Burger</h1>

        <p className="loading-sub">Cooking something legendary...</p>

        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>

      </div>
    </div>
  );
}

export default LoadingScreen;