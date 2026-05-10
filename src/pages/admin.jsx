import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Logo from "../assets/logo.png";
import Burgers from "../components/manageburger";
import Orders from "../components/Orders";
import Dashboard from "../components/Dashboard";
import { socket } from "../socket"; 
import { 
  FaHome, 
  FaHamburger, 
  FaClipboardList, 
  FaSignOutAlt 
} from "react-icons/fa";
import { RiH1 } from "react-icons/ri";

function Admin() {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false); // 🔥 sidebar toggle
  const [newOrders, setNewOrders] = useState(0);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("loggedIn");
    };
  }, []);

useEffect(() => {
  socket.on("new-order", (order) => {
    console.log("🔥 NEW ORDER GLOBAL", order);

    if (active === "orders") {
      // 👉 update UI instantly if on orders page
      window.dispatchEvent(
        new CustomEvent("new-order-event", { detail: order })
      );
    } else {
      // 👉 show badge if not on orders page
      setNewOrders((prev) => prev + 1);
    }
  });

  return () => socket.off("new-order");
}, [active]);

  return (
    <div className="admin-container">

      {/* 🔥 HAMBURGER BUTTON */}
      <div 
        className={`hamburger ${open ? "open" : ""}`} 
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔥 SIDEBAR */}
      <div className={`sidebar ${open ? "show" : ""}`}>

        <div className="logo-box">
          <FaHamburger className="logo-icon" />
          <div>
            <h2>Burger</h2>
            <span>House</span>
          </div>
        </div>

        <div className="admin-box">
          <img src={Logo} alt="admin" />
          <div>
            <h4>Beka Admin</h4>
            <p>Beka burger-shake admin</p>
          </div>
        </div>

        <div className="menu">

          <div
            className={`menu-item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActive("dashboard");
              setOpen(false); // 🔥 auto close mobile
            }}
          >
            <FaHome />
            <span>Dashboard</span>
          </div>

          <div
            className={`menu-item ${active === "burgers" ? "active" : ""}`}
            onClick={() => {
              setActive("burgers");
              setOpen(false);
            }}
          >
            <FaHamburger />
            <span>Manage Burgers</span>
          </div>

          <div
            className={`menu-item ${active === "orders" ? "active" : ""}`}
            onClick={() => {
              if (active !== "orders") {
                setNewOrders(0); // 🔥 only reset when switching
              }

              setActive("orders");
              setOpen(false);
            }}
          >
            <FaClipboardList />
            <span>
            Orders
            {newOrders > 0 && (
              <span className="notif-badge">{newOrders}</span>
            )}
          </span>
          </div>

          <div
            className="menu-item logout"
            onClick={() => {
              sessionStorage.removeItem("loggedIn");
              navigate("/");
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        {active === "dashboard" && <Dashboard />}
        {active === "burgers" && <Burgers />}
        {active === "orders" && <Orders />}
      </div>

    </div>
  );
}

export default Admin;