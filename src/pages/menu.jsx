import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Menu.css";
import { FaShoppingCart } from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

function Menu() {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [skeletonCount, setSkeletonCount] = useState(6);

  const foodTypes = [
    "All",
    "Burger",
    "Pizza",
    "Drink",
    "Chicken",
    "Burrito",
    "Fries",
    "Dessert",
    "Sandwich",
  ];

  const handleFilter = async (type) => {
    setLoading(true);
    setSelectedType(type);

    try {
      const res = await axios.get("/api/burgers");
      setItems(res.data);
    } catch (err) {
      console.log("Error fetching menu:", err);
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/burgers");

      setTimeout(() => {
        setItems(res.data);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.log("Error fetching menu:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      const columns =
        width > 1200 ? 4 :
        width > 900 ? 3 :
        width > 600 ? 2 : 1;

      setSkeletonCount(columns * 2);
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const filteredItems =
    selectedType === "All"
      ? items
      : selectedType === "Popular"
      ? items.filter((item) => item.is_popular === true)
      : items.filter((item) =>
          item.category?.toLowerCase().includes(selectedType.toLowerCase())
        );

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div>
      <Header />

      <section className="menu-page">

        {/* 🔥 HEADER ANIMATION */}
        <motion.div
          className="menu-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">
            Choose your favorite food and enjoy the taste.
          </p>
        </motion.div>

        {/* 🔥 FILTERS ANIMATION */}
        <motion.div
          className="menu-filters"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {foodTypes.map((type) => (
            <button
              key={type}
              className={`filter-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => handleFilter(type)}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* GRID */}
        <div className="menu-grid">

          {loading ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <div className="skeleton-card" key={index}>
                <div className="skeleton-img"></div>
                <div className="skeleton-body">
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line price"></div>
                  <div className="skeleton-line button"></div>
                </div>
              </div>
            ))
          ) : filteredItems.length === 0 ? (
            <p className="menu-empty">No items found.</p>
          ) : (
            filteredItems.map((item, index) => (
              
              /* 🔥 CARD ANIMATION */
              <motion.div
                className="menu-card"
                key={item.id}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="menu-img-wrapper">
                  <img src={item.image_url} alt={item.name} />

                  {item.is_popular && (
                    <span className="badge-popular">Popular</span>
                  )}

                  <span className={`menu-type-badge ${item.category?.toLowerCase()}`}>
                    {item.category}
                  </span>
                </div>

                <div className="menu-card-body">
                  <h3 className="menu-item-title">{item.name}</h3>

                  <p className="menu-price">
                    ETB {Number(item.price).toFixed(2)}
                  </p>

                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Menu;