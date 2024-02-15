import React, { useState } from "react";
import "../../styles/NewCleaning.scss";
import { useNavigate } from "react-router-dom";
import Compressor from 'compressorjs'

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
    mainImage: null,
    detailsImage: null,
  });
  const handleImageChange = async (e) => {
    const { name, files } = e.target;
  
    if (files && files.length > 0) {
      new Compressor(files[0], {
        quality: 0.5,
        maxWidth: 800,
        maxHeight: 800,
        success: (compressedImage) => {
          // Directly use the compressedImage as it's already a File object
          setFormData((prevState) => ({ ...prevState, [name]: compressedImage }));
        },
        error: (err) => {
          console.error('Error compressing image:', err);
        },
      });
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      if (formData.mainImage) {
        form.append("mainImage", formData.mainImage);
      }

      if (formData.detailsImage) {
        form.append("detailsImage", formData.detailsImage);
      }

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

        <label>Main Image</label>
        <input
          className="image-upload"
          type="file"
          name="mainImage"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label>Details Image</label>
        <input
          className="image-upload"
          type="file"
          name="detailsImage"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewCleaningProduct;
