import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageBurgers.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Burgers() {
const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_url: "",
    category: "",
    is_popular: false,
  });

  const [editingId, setEditingId] = useState(null);

  const categories = [
  "Burger",
  "Pizza",
  "Drink",
  "Chicken",
  "Burrito",
  "Fries",
  "Dessert",
  "Sandwich"
];

  const fetchBurgers = async () => {
    try {
      const res = await axios.get(`/api/burgers`);
      setBurgers(res.data);
    } catch (err) {
      console.log("Error fetching burgers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBurgers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const resetForm = () => {
  setFormData({
    name: "",
    price: "",
    image_url: "",
    category: "",
    is_popular: false,
  });
  setEditingId(null);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.image_url.trim() ||
      !formData.category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/burgers/${editingId}`, formData);
      } else {
        await axios.post("/api/burgers", formData);
      }

      await fetchBurgers();
      resetForm();
    } catch (err) {
      console.log("Submit error:", err);
      alert("Something went wrong");
    }
  };

const handleEdit = (burger) => {
  setFormData({
    name: burger.name,
    price: burger.price,
    image_url: burger.image_url,
    category: burger.category,
    is_popular: burger.is_popular || false,
  });
  setEditingId(burger.id);
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this burger?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/burgers/${id}`);
      await fetchBurgers();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete burger");
    }
  };

  return (
    <div className="manage-burgers-page">
      <div className="burger-header">
        <h1>Manage Burgers</h1>
        <p>Add, edit, and control your burger menu from one place.</p>
      </div>

      <div className="burger-layout">
        {/* FORM */}
        <div className="burger-form-card">
          <div className="form-title-row">
            <FaPlus className="form-icon" />
            <h2>{editingId ? "Edit Burger" : "Add New Burger"}</h2>
          </div>

          <form onSubmit={handleSubmit} className="burger-form">
            <div className="input-group">
              <label>Burger Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter burger name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image_url"
                placeholder="Paste image URL"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Food type</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select food type</option>
                {categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
<div className="input-group">
  <label className="toggle-wrapper">
    <span>Mark as Popular</span>

    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={formData.is_popular}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            is_popular: e.target.checked,
          }))
        }
      />
      <span className="slider"></span>
    </div>
  </label>
</div>
            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editingId ? "Update Burger" : "Add Burger"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LIST */}
        <div className="burger-list-card">
          <h2>All Burgers</h2>

          {loading ? (
            <p className="empty-text">Loading burgers...</p>
          ) : burgers.length === 0 ? (
            <p className="empty-text">No burgers found.</p>
          ) : (
<div className="burger-table">

  <div className="table-header">
    <span>Image</span>
    <span>Name</span>
    <span>Price</span>
    <span>Type</span>
    <span>Actions</span>
  </div>

  {burgers.map((burger) => (
    <div className="table-row" key={burger.id}>
      
      <img src={burger.image_url} alt="" className="table-img" />

      <span>{burger.name}</span>

      <span>ETB {burger.price}</span>

      <span className={`type ${burger.category.toLowerCase()}`}>
        {burger.category}
      </span>

      <div className="burger-actions">
        <button onClick={() => handleEdit(burger)}>
          <FaEdit />
        </button>

        <button onClick={() => handleDelete(burger.id)}>
          <FaTrash />
        </button>
      </div>

    </div>
  ))}
</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Burgers;