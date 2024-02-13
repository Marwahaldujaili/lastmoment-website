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
    images: [], // Update the state to handle multiple images
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Update the state to include an array of File objects
    setFormData((prevState) => ({ ...prevState, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("productName", formData.productName);
      form.append("scent", formData.scent);
      form.append("capacity", formData.capacity);
      form.append("quantity", formData.quantity);
      form.append("pricePerCarton", formData.pricePerCarton);
      form.append("pricePerPiece", formData.pricePerPiece);

      // Append each image file to the FormData object
      formData.images.forEach((image) => {
        form.append("images", image);
      });

      const response = await fetch(`${apiUrl}/product/cleaning/new`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product created", data);
        navigate("/allcleaning");
      } else {
        console.log("Error", data.error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="newCleaning-container">
      <h1>Add New Cleaning Product</h1>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label>Product Scent</label>
        <input
          type="text"
          name="scent"
          value={formData.scent}
          onChange={handleChange}
        />

        <label>Capacity</label>
        <input
          type="text"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <label>Price Per Carton</label>
        <input
          type="text"
          name="pricePerCarton"
          value={formData.pricePerCarton}
          onChange={handleChange}
        />

        <label>Price Per Piece</label>
        <input
          type="text"
          name="pricePerPiece"
          value={formData.pricePerPiece}
          onChange={handleChange}
        />
        <label> </label>
        <input
          className="image-upload"
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewCleaningProduct;
