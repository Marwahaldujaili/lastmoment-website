import React, { useState } from "react";
import "../../styles/NewCleaning.scss";
import { useNavigate } from "react-router-dom";

function NewCleaningProduct() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    scent: "",
    capacity: "",
    quantity: "",
    pricePerCarton: "",
    pricePerPiece: "",
    image: "",
  });
  const [error, setError] = useState(null); // State to manage the error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/product/cleaning/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product created", data);
        navigate("/cleaning");
      } else {
        console.log("Error", data.error);
        setError(data.error); // Update the error state
      }
    } catch (error) {
      setError("An unexpected error occurred."); // Update the error state

      console.error("Error", error);
    }
  };

  return (
    <div className="newCleaning-container">
      <h1>Add New Cleaning Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Product Scent:
          <input
            type="text"
            name="scent"
            value={formData.scent}
            onChange={handleChange}
          />
        </label>
        <label>
          Capacity:
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Price Per Carton:
          <input
            type="text"
            name="pricePerCarton"
            value={formData.pricePerCarton}
            onChange={handleChange}
          />
        </label>
        <label>
          Price Per Piece:
          <input
            type="text"
            name="pricePerPiece"
            value={formData.pricePerPiece}
            onChange={handleChange}
          />
        </label>
        {/* <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label> */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewCleaningProduct;
