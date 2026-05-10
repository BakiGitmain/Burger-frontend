import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", {
        username,
        password
      });

      if (res.data.success) {
        sessionStorage.setItem("loggedIn", "true");
        navigate("/admin");
      } else {
        alert("Wrong credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Admin Login 🔐</h1>

        <form onSubmit={handleLogin} className="login-form">

          {/* USER INPUT */}
          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;