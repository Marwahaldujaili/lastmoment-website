import React, { useState } from "react";
import "../../styles/NewCleaning.scss";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

function NewCleaningProduct() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const [mainImageName, setMainImageName] = useState("");
  const [detailsImageName, setDetailsImageName] = useState("");

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
      const fileName = files[0].name;
      new Compressor(files[0], {
        quality: 100,
        maxWidth: 2800,
        maxHeight: 2800,
        success: (compressedImage) => {
          setFormData((prevState) => ({
            ...prevState,
            [name]: compressedImage,
          }));
          if (name === "mainImage") {
            setMainImageName(fileName);
          } else if (name === "detailsImage") {
            setDetailsImageName(fileName);
          }
        },
        error: (err) => {
          console.error("Error compressing image:", err);
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
        form.append("mainImage", formData.mainImage, mainImageName);
      }

      if (formData.detailsImage) {
        form.append("detailsImage", formData.detailsImage, detailsImageName);
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
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Scent</label>
            <input
              type="text"
              name="scent"
              value={formData.scent}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Capacity</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price Per Carton</label>
            <input
              type="text"
              name="pricePerCarton"
              value={formData.pricePerCarton}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price Per Piece</label>
            <input
              type="text"
              name="pricePerPiece"
              value={formData.pricePerPiece}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group image-upload-group">
            <label>Main Image</label>
            <button
              type="button"
              className="image-upload-button"
              onClick={() => document.getElementById("mainImageInput").click()}
            >
              +
            </button>
            {mainImageName && (
              <span className="file-name">{mainImageName}</span>
            )}
            <input
              id="mainImageInput"
              type="file"
              name="mainImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="form-group image-upload-group">
            <label>Details Image</label>
            <button
              type="button"
              className="image-upload-button"
              onClick={() =>
                document.getElementById("detailsImageInput").click()
              }
            >
              +
            </button>
            {detailsImageName && (
              <span className="file-name">{detailsImageName}</span>
            )}
            <input
              id="detailsImageInput"
              type="file"
              name="detailsImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewCleaningProduct;
