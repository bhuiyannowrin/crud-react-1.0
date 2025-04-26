import React, { useState, useEffect } from "react";
import './AddProduct.css';

const AddProduct = ({ setAddProduct, handleAddProduct, editProduct }) => {
  const categories = ["Electronics", "Computers", "Audio", "Tablets", "Accessories"];
  
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    dateAdded: new Date().toLocaleDateString('en-GB')
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(product);
    setProduct({ name: "", category: "", price: "", stock: "" });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editProduct ? "Edit Product" : "Add New Product"}</h2>
        <p>Fill in the details to {editProduct ? "update" : "add"} a product.</p>

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <label>Select a Category</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <div className="input-row">
            <div>
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={() => setAddProduct(false)}>
              Cancel
            </button>
            <button type="submit" className="create">
              {editProduct ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;