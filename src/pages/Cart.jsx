import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "motion/react";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaArrowRight,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaStore,
  FaMotorcycle,
  FaUtensils,
} from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useContext(CartContext);

  const [orderType, setOrderType] = useState("delivery");

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    secondPhone: "",
    address: "",
    location: "",
  });

  const deliveryLocations = [
    { name: "Bole", price: 60 },
    { name: "Megenagna", price: 80 },
    { name: "Piassa", price: 70 },
    { name: "CMC", price: 90 },
    { name: "Sarbet", price: 65 },
  ];

  const subtotal = getTotalPrice();
  const packingFee = orderType === "pickup" ? 50 : 0;

  const selectedLocationData = deliveryLocations.find(
    (place) => place.name === customerInfo.location
  );

  const deliveryFee =
    orderType === "delivery" && selectedLocationData
      ? selectedLocationData.price
      : 0;

  const grandTotal = subtotal + packingFee + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formIsValid = useMemo(() => {
    const hasBasicInfo =
      customerInfo.fullName.trim() !== "" &&
      customerInfo.phone.trim() !== "";

    if (!hasBasicInfo) return false;

    if (orderType === "delivery") {
      return (
        customerInfo.address.trim() !== "" &&
        customerInfo.location.trim() !== ""
      );
    }

    return true;
  }, [customerInfo, orderType]);

  const handleProceedCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!formIsValid) {
      alert("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        orderType,
        customerInfo,
        items: cart,
        subtotal,
        deliveryFee,
        packingFee,
        total: grandTotal,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await axios.post("/api/order", orderData);
    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      toast.error("Something went wrong ❌");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      clearCart();
      setShowSuccess(true);
    }, 100);
  };

  return (
    <div>
      <Header />

      <section className="cart-page">
        <motion.div
          className="cart-topbar"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <h1 className="cart-main-title">Your Cart & Checkout</h1>
            <p className="cart-subtitle">
              Review your items, choose your order type, and complete your info.
            </p>
          </div>

          <button
            className="back-shopping-btn top-back-btn"
            onClick={() => navigate("/menu")}
          >
            <FaShoppingBag />
            Go Back Shopping
          </button>
        </motion.div>

        <div className="cart-layout">
          <motion.div
            className="cart-left"
            initial={{ x: -90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="cart-panel">
              <div className="section-title-row">
                <h2>Order Items</h2>
                <span className="item-counter">
                  {cart.reduce((total, item) => total + item.quantity, 0)} items
                </span>
              </div>

              {cart.length === 0 ? (
                <motion.div
                  className="empty-cart-box"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="empty-cart-icon">
                    <FaShoppingBag />
                  </div>
                  <h3>Your cart is empty</h3>
                  <p>Add some delicious items from the menu to continue.</p>

                  <button
                    className="back-shopping-btn"
                    onClick={() => navigate("/menu")}
                  >
                    <FaArrowRight />
                    Go to Menu
                  </button>
                </motion.div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item, index) => (
                    <motion.div
                      className="cart-card"
                      key={item.id}
                      initial={{ y: 70, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        ease: "easeOut",
                        delay: index * 0.08,
                      }}
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      <div className="cart-card-image-wrap">
                        <img src={item.image_url} alt={item.name} />
                      </div>

                      <div className="cart-card-info">
                        <h3>{item.name}</h3>
                        <p>
                          {item.description ||
                            "Freshly prepared with quality ingredients."}
                        </p>
                        <span className="single-price">
                          ETB {Number(item.price).toFixed(2)} each
                        </span>
                      </div>

                      <div className="cart-card-actions">
                        <div className="quantity-box">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <FaMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <div className="item-total-box">
                          <span>Total</span>
                          <strong>
                            ETB{" "}
                            {(Number(item.price) * item.quantity).toFixed(2)}
                          </strong>
                        </div>

                        <button
                          className="delete-btn"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="cart-right"
            initial={{ x: 90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="cart-panel summary-panel">
              <div className="section-title-row">
                <h2>Checkout Details</h2>
              </div>

              <div className="order-type-section">
                <label className="checkout-label">Choose Order Type</label>

                <div className="order-type-grid">
                  <button
                    type="button"
                    className={`order-type-card ${
                      orderType === "delivery" ? "active" : ""
                    }`}
                    onClick={() => setOrderType("delivery")}
                  >
                    <FaMotorcycle />
                    <span>Delivery</span>
                  </button>

                  <button
                    type="button"
                    className={`order-type-card ${
                      orderType === "pickup" ? "active" : ""
                    }`}
                    onClick={() => setOrderType("pickup")}
                  >
                    <FaStore />
                    <span>Pickup</span>
                  </button>

                  <button
                    type="button"
                    className={`order-type-card ${
                      orderType === "dinein" ? "active" : ""
                    }`}
                    onClick={() => setOrderType("dinein")}
                  >
                    <FaUtensils />
                    <span>Dine In</span>
                  </button>
                </div>
              </div>

              <div className="customer-form">
                <label className="checkout-label">Customer Information</label>

                <div className="input-group">
                  <span className="input-icon"></span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon"></span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon"></span>
                  <input
                    type="text"
                    name="secondPhone"
                    placeholder="Second Phone Number (Optional)"
                    value={customerInfo.secondPhone}
                    onChange={handleInputChange}
                  />
                </div>

                {orderType === "delivery" && (
                  <>
                    <div className="input-group">
                      <span className="input-icon"></span>
                      <input
                        type="text"
                        name="address"
                        placeholder="Full Address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="select-group">
                      <span className="input-icon">
                        <FaMapMarkerAlt />
                      </span>

                      <select
                        name="location"
                        value={customerInfo.location}
                        onChange={handleInputChange}
                      >
                        <option value="">Choose Your Location</option>

                        {deliveryLocations.map((location) => (
                          <option key={location.name} value={location.name}>
                            {location.name} - ETB {location.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="summary-box">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>ETB {subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Order Type</span>
                  <span className="capitalize-text">{orderType}</span>
                </div>

                {orderType === "delivery" && (
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>ETB {deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                {orderType === "pickup" && (
                  <div className="summary-row">
                    <span>Packing Fee</span>
                    <span>ETB {packingFee.toFixed(2)}</span>
                  </div>
                )}

                {orderType === "dinein" && (
                  <div className="summary-row">
                    <span>Service Type</span>
                    <span>Eat at Restaurant</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>ETB {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="checkout-btn"
                onClick={handleProceedCheckout}
                disabled={loading}
              >
                {loading ? <span className="loader"></span> : "Proceed Checkout →"}
              </button>

              <button
                className="back-shopping-btn bottom-back-btn"
                type="button"
                onClick={() => navigate("/menu")}
              >
                <FaShoppingBag />
                Go Back Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✔</div>

            <h2>Order Successful</h2>
            <p>Please wait for a confirmation call</p>

            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/menu");
              }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;