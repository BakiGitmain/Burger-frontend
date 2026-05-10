import { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import { socket } from "../socket";
import {
  FaUser,
  FaPhone,
  FaCheck,
  FaTimes,
  FaBox
} from "react-icons/fa";
import {
  FaTruck,
  FaStore,
  FaUtensils,
  FaMapMarkerAlt
} from "react-icons/fa";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [openLocation, setOpenLocation] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const getItemsCount = (items) => {
    try {
      if (typeof items === "string") {
        return JSON.parse(items).length;
      }
      return items.length;
    } catch {
      return 0;
    }
  };

  const parseItems = (items) => {
    try {
      return typeof items === "string" ? JSON.parse(items) : items;
    } catch {
      return [];
    }
  };
const filteredOrders =
  filter === "all"
    ? orders
    : orders.filter((order) => order.status === filter);

useEffect(() => {
  const handler = (e) => {
    const order = e.detail;
    setOrders((prev) => [order, ...prev]);
  };

  window.addEventListener("new-order-event", handler);

  return () => window.removeEventListener("new-order-event", handler);
}, []);
  return (
    <div className="orders-page">

      {/* TOP */}
      <div className="orders-topbar">
        <div className="orders-title-box">
          <h1>Orders 📦</h1>
          <p>Manage and track all customer orders</p>
        </div>

        <div className="orders-count-badge">
          {orders.length} Orders
        </div>
      </div>
<div className="orders-filter">

  <button
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={filter === "pending" ? "active" : ""}
    onClick={() => setFilter("pending")}
  >
    Pending
  </button>

  <button
    className={filter === "delivered" ? "active" : ""}
    onClick={() => setFilter("delivered")}
  >
    Delivered
  </button>

  <button
    className={filter === "canceled" ? "active" : ""}
    onClick={() => setFilter("canceled")}
  >
    Canceled
  </button>

</div>
      {/* TABLE */}
      <div className="orders-table-wrapper">

        <div className="orders-table-head">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No Orders Yet</h3>
            <p>When customers place orders, they will appear here.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id}>

              {/* 🔥 MAIN ROW */}
              <div
                className="orders-table-row"
                onClick={() =>
                  setOpenOrder(openOrder === order.id ? null : order.id)
                }
              >

                <span className="order-id">
                  #ORD-{String(order.id).padStart(3, "0")}
                </span>

                <span className="customer-col">
                  <span className="customer-name">
                    <FaUser />
                    {order.full_name}
                  </span>
                  <span className="customer-phone">
                    <FaPhone />
                    {order.phone}
                  </span>
                </span>

<span className="items-col">
  <div className="items-wrapper">

    <div className="items-count">
      <FaBox />
      <span>{getItemsCount(order.items)} Items</span>
    </div>

    <div
      className={`order-type ${order.order_type}`}
      onClick={(e) => {
        e.stopPropagation();
        if (order.order_type === "delivery") {
          setOpenLocation(
            openLocation === order.id ? null : order.id
          );
        }
      }}
    >
      {order.order_type === "delivery" && <FaTruck />}
      {order.order_type === "pickup" && <FaStore />}
      {order.order_type === "dinein" && <FaUtensils />}

      <span>
        {order.order_type === "delivery" && "Delivery"}
        {order.order_type === "pickup" && "Pickup"}
        {order.order_type === "dinein" && "Dine-in"}
      </span>
    </div>

  </div>
</span>

                <span className="total-col">
                  ETB {order.total}
                </span>

                <span className={`status ${order.status}`}>
                  {order.status}
                </span>

                <div className="actions">
                  <button
                    className="btn delivered"
                    disabled={order.status === "delivered"}
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 VERY IMPORTANT
                      updateStatus(order.id, "delivered");
                    }}
                  >
                    <FaCheck />
                    Delivered
                  </button>

                  <button
                    className="btn canceled"
                    disabled={order.status === "canceled"}
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 VERY IMPORTANT
                      updateStatus(order.id, "canceled");
                    }}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>

              </div>

              {/* 🔥 DROPDOWN ITEMS */}
              {openOrder === order.id && (
                <div className="order-items-dropdown">

                  {parseItems(order.items).map((item, i) => (
                    <div key={i} className="dropdown-item">

                      {/* 🍔 IMAGE + NAME */}
                      <div className="item-left">
                        <img
                          src={item.image_url || "/placeholder.png"}
                          alt={item.name}
                          className="item-img"
                        />
                        <span className="item-name">{item.name}</span>
                      </div>

                      {/* 🔢 QUANTITY */}
                      <span className="item-qty">x{item.quantity}</span>

                      {/* 💰 PRICE */}
                      <span className="item-price">ETB {item.price}</span>

                    </div>
                  ))}

                </div>
              )}
              {openLocation === order.id && order.order_type === "delivery" && (
                <div className="location-dropdown">
                  <FaMapMarkerAlt />
                  <span>
                    {order.location} - {order.address}
                  </span>
                </div>
              )}
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Orders;