import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import burger from "../assets/Upperburger.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaHamburger } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { CartContext } from "../context/CartContext";
import "../index.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/burgers");
        setItems(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, []);

  const popularItems = items.filter((item) => item.is_popular === true);

  return (
    <div>
      <Header />

      <div className="upperbody-box">
        <motion.div
          className="upper-title"
          initial={{ x: -90, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <h1 className="main-title">
            Fresh, Juicy and <span className="span-title">Legendary</span>
          </h1>

          <h2 className="main-title-h2">
            From the first bite to the last, experience juicy perfection,
            bold flavors, and a taste you'll never forget.
          </h2>

          <button className="order-btn" onClick={() => navigate("/menu")}>
            Order Now <FaArrowRightLong className="arrow" />
          </button>
        </motion.div>

        <motion.div
          className="burger-wrapper"
          initial={{ x: 110, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <img src={burger} className="burger-img" alt="Burger" />
        </motion.div>
      </div>

      <div className="popular-box">
        <motion.div
          className="popular-text"
          initial={{ y: 70, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <h1>
            Popular <span>Burgers</span>
          </h1>
          <a href="/menu">
            View All <FaArrowRightLong className="arrow-view" />
          </a>
        </motion.div>

        <div className="popular-cards-container">
          {popularItems.length === 0 ? (
            <p style={{ color: "#aaa" }}>No popular items yet</p>
          ) : (
            popularItems.map((item, index) => (
              <motion.div
                className="popular-cards"
                key={item.id}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="card">
                  <img src={item.image_url} alt={item.name} />
                  {item.is_popular && (
                    <span className="badge-popular">Popular</span>
                  )}

                  <h3>{item.name}</h3>
                  <p>
                    {item.description ||
                      "Delicious and fresh made just for you."}
                  </p>
                  <h2>ETB {item.price}</h2>

                  <div className="cart-box1">
                    <button
                      className="chartbtn1"
                      onClick={() => {
                        addToCart(item);
                        toast.success(`${item.name} added to cart`);
                      }}
                    >
                      <FaCartArrowDown /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="underline"></div>

        <div className="delivery-row">
          <motion.div
            className="delivery-box"
            initial={{ y: 70, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="delivery-cards">
              <div className="dilivery-icon">
                <MdOutlineDeliveryDining />
              </div>
              <div className="delivery-titles">
                <h3>Fast Delivery</h3>
                <p>10-30 min on your door</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="delivery-box"
            initial={{ y: 70, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="delivery-cards">
              <div className="dilivery-icon">
                <FaHamburger />
              </div>
              <div className="delivery-titles">
                <h3>Fresh Ingredients</h3>
                <p>Made with quality & fresh daily</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="delivery-box"
            initial={{ y: 70, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="delivery-cards">
              <div className="dilivery-icon">
                <RiCustomerService2Line />
              </div>
              <div className="delivery-titles">
                <h3>Fast Support</h3>
                <p>Always here to help</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="underline"></div>
      <Footer />
    </div>
  );
}

export default Home;