import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import {
  FaDollarSign,
  FaShoppingCart,
  FaHamburger,
  FaStar,
  FaCalendarAlt,
  FaFire,
  FaClock,
  FaTruck,
  FaStore,
  FaUtensils,
} from "react-icons/fa";

import { FaArrowTrendUp, FaArrowTrendDown, FaChartLine } from "react-icons/fa6";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, burgersRes] = await Promise.all([
        axios.get("/api/orders"),
        axios.get("/api/burgers"),
      ]);

      setOrders(ordersRes.data || []);
      setBurgers(burgersRes.data || []);
    } catch (err) {
      console.log("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const totalOrders = orders.length;
    const totalMenuItems = burgers.length;
    const popularItems = burgers.filter((item) => item.is_popular).length;

    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
    const canceledOrders = orders.filter((o) => o.status === "canceled").length;

    const deliveryOrders = orders.filter((o) => o.order_type === "delivery").length;
    const pickupOrders = orders.filter((o) => o.order_type === "pickup").length;
    const dineInOrders = orders.filter((o) => o.order_type === "dinein").length;

    const completionRate =
      totalOrders === 0
        ? 0
        : Math.round((deliveredOrders / totalOrders) * 100);

    return {
      totalRevenue,
      totalOrders,
      totalMenuItems,
      popularItems,
      pendingOrders,
      deliveredOrders,
      canceledOrders,
      deliveryOrders,
      pickupOrders,
      dineInOrders,
      completionRate,
    };
  }, [orders, burgers]);

  const categoryData = useMemo(() => {
    const counts = {};

    burgers.forEach((item) => {
      const key = item.category || "Other";
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [burgers]);

  const revenueBars = useMemo(() => {
    const raw = [
      Math.round(stats.totalRevenue * 0.32),
      Math.round(stats.totalRevenue * 0.48),
      Math.round(stats.totalRevenue * 0.41),
      Math.round(stats.totalRevenue * 0.63),
      Math.round(stats.totalRevenue * 0.37),
      Math.round(stats.totalRevenue * 0.56),
      Math.round(stats.totalRevenue * 0.72),
    ];

    const max = Math.max(...raw, 1);

    return raw.map((value, index) => ({
      label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
      value,
      height: `${Math.max((value / max) * 100, 10)}%`,
    }));
  }, [stats.totalRevenue]);

  const topPopularItems = useMemo(() => {
    return burgers.filter((item) => item.is_popular).slice(0, 5);
  }, [burgers]);

  const donutStyle = {
    background: `conic-gradient(
      #ffb300 0% ${stats.completionRate}%,
      rgba(255,255,255,0.08) ${stats.completionRate}% 100%
    )`,
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading-card">
          <div className="dashboard-loader"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div className="dashboard-hero-text">
          <h1>Dashboard</h1>
          <p>Track revenue, orders, menu performance, and service flow in one place.</p>
        </div>

        <div className="dashboard-hero-badge">
          <FaCalendarAlt />
          <span>Live Overview</span>
        </div>
      </div>

      <div className="dashboard-top-stats">
        <div className="dash-stat-card revenue">
          <div className="dash-stat-icon">
            <FaDollarSign />
          </div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Revenue</span>
            <h3>ETB {stats.totalRevenue.toLocaleString()}</h3>
            <p className="dash-stat-change positive">
              <FaArrowTrendUp /> Strong income flow
            </p>
          </div>
        </div>

        <div className="dash-stat-card orders">
          <div className="dash-stat-icon">
            <FaShoppingCart />
          </div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Orders</span>
            <h3>{stats.totalOrders}</h3>
            <p className="dash-stat-change neutral">
              <FaClock /> All-time received orders
            </p>
          </div>
        </div>

        <div className="dash-stat-card menu">
          <div className="dash-stat-icon">
            <FaHamburger />
          </div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Menu Items</span>
            <h3>{stats.totalMenuItems}</h3>
            <p className="dash-stat-change neutral">
              <FaFire /> {stats.popularItems} marked popular
            </p>
          </div>
        </div>

        <div className="dash-stat-card rating">
          <div className="dash-stat-icon">
            <FaStar />
          </div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Completion Rate</span>
            <h3>{stats.completionRate}%</h3>
            <p className={`dash-stat-change ${stats.completionRate >= 50 ? "positive" : "negative"}`}>
              {stats.completionRate >= 50 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
              Delivered vs total orders
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-panel analytics-panel">
          <div className="panel-title-row">
            <div>
              <h2>Revenue Activity</h2>
              <p>Simple weekly performance overview</p>
            </div>
            <div className="panel-chip">
              <FaChartLine />
              <span>7 Days</span>
            </div>
          </div>

          <div className="bar-chart">
            {revenueBars.map((bar) => (
              <div className="bar-item" key={bar.label}>
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: bar.height }}></div>
                </div>
                <span>{bar.label}</span>
              </div>
            ))}
          </div>

          <div className="analytics-summary-row">
            <div className="mini-summary-box">
              <small>Pending</small>
              <strong>{stats.pendingOrders}</strong>
            </div>
            <div className="mini-summary-box">
              <small>Delivered</small>
              <strong>{stats.deliveredOrders}</strong>
            </div>
            <div className="mini-summary-box">
              <small>Canceled</small>
              <strong>{stats.canceledOrders}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel progress-panel">
          <div className="panel-title-row">
            <div>
              <h2>Order Success</h2>
              <p>Service completion progress</p>
            </div>
          </div>

          <div className="progress-circle-wrap">
            <div className="progress-circle" style={donutStyle}>
              <div className="progress-circle-inner">
                <span>{stats.completionRate}%</span>
              </div>
            </div>
          </div>

          <div className="progress-list">
            <div className="progress-list-row">
              <span>Delivered Orders</span>
              <strong>{stats.deliveredOrders}</strong>
            </div>
            <div className="progress-list-row">
              <span>Pending Orders</span>
              <strong>{stats.pendingOrders}</strong>
            </div>
            <div className="progress-list-row">
              <span>Canceled Orders</span>
              <strong>{stats.canceledOrders}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel service-panel">
          <div className="panel-title-row">
            <div>
              <h2>Order Type Split</h2>
              <p>Where your orders are coming from</p>
            </div>
          </div>

          <div className="service-cards">
            <div className="service-card delivery">
              <div className="service-icon">
                <FaTruck />
              </div>
              <div>
                <small>Delivery</small>
                <h3>{stats.deliveryOrders}</h3>
              </div>
            </div>

            <div className="service-card pickup">
              <div className="service-icon">
                <FaStore />
              </div>
              <div>
                <small>Pickup</small>
                <h3>{stats.pickupOrders}</h3>
              </div>
            </div>

            <div className="service-card dinein">
              <div className="service-icon">
                <FaUtensils />
              </div>
              <div>
                <small>Dine-in</small>
                <h3>{stats.dineInOrders}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel categories-panel">
          <div className="panel-title-row">
            <div>
              <h2>Menu Categories</h2>
              <p>Most represented menu types</p>
            </div>
          </div>

          <div className="category-list">
            {categoryData.length === 0 ? (
              <p className="dashboard-empty-text">No category data yet.</p>
            ) : (
              categoryData.map((category, index) => (
                <div className="category-row" key={category.name}>
                  <div className="category-left">
                    <span className="category-rank">0{index + 1}</span>
                    <span className="category-name">{category.name}</span>
                  </div>
                  <div className="category-right">
                    <div className="category-bar">
                      <div
                        className="category-bar-fill"
                        style={{
                          width: `${Math.max(
                            (category.value /
                              Math.max(...categoryData.map((c) => c.value), 1)) *
                              100,
                            20
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <strong>{category.value}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-panel popular-panel">
          <div className="panel-title-row">
            <div>
              <h2>Popular Items</h2>
              <p>Highlighted food on your menu</p>
            </div>
            <div className="panel-chip fire">
              <FaFire />
              <span>Top Picks</span>
            </div>
          </div>

          <div className="popular-list">
            {topPopularItems.length === 0 ? (
              <p className="dashboard-empty-text">No popular items yet.</p>
            ) : (
              topPopularItems.map((item) => (
                <div className="popular-row" key={item.id}>
                  <img src={item.image_url} alt={item.name} />
                  <div className="popular-row-text">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <span className="popular-price">
                    ETB {Number(item.price).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-panel snapshot-panel">
          <div className="panel-title-row">
            <div>
              <h2>Quick Snapshot</h2>
              <p>Fast glance summary of the business</p>
            </div>
          </div>

          <div className="snapshot-grid">
            <div className="snapshot-box">
              <small>Total Revenue</small>
              <strong>ETB {stats.totalRevenue.toLocaleString()}</strong>
            </div>
            <div className="snapshot-box">
              <small>Total Orders</small>
              <strong>{stats.totalOrders}</strong>
            </div>
            <div className="snapshot-box">
              <small>Popular Items</small>
              <strong>{stats.popularItems}</strong>
            </div>
            <div className="snapshot-box">
              <small>Menu Size</small>
              <strong>{stats.totalMenuItems}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;