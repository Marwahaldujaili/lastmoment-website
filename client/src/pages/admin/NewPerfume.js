import React, { useState } from "react";
import "../../styles/NewPerfume.scss";
import { useNavigate, Link } from "react-router-dom";
import Compressor from "compressorjs";

function NewPerfume() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const [mainImageName, setMainImageName] = useState("");
  // const [detailsImageName, setDetailsImageName] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    capacity: "",
    price: "",
    discountedPrice: "",
    description: "",
    mainImage: null,
    // detailsImage: null,
  });

  const handleImageChange = async (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      new Compressor(files[0], {
        quality: 100,
        maxWidth: 1800,
        maxHeight: 1800,
        success: (compressedImage) => {
          // Append the compressed file directly, not its Blob URL
          setFormData((prevState) => ({
            ...prevState,
            [name]: compressedImage,
          }));
          if (name === "mainImage") {
            setMainImageName(files[0].name); // Display the original file name
          }
          // else if (name === "detailsImage") {
          //   setDetailsImageName(files[0].name);
          // }
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

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] != null) {
        form.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${apiUrl}/product/perfume/new`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Perfume created", data);
        navigate("/allperfumes"); // Adjust navigation path
      } else {
        console.log("Error", data.error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="newPerfume-container">
      <h1>Add New Perfume Product</h1>
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
            <label>Capacity</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Discounted Price</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
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

          {/* <div className="form-group image-upload-group">
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
          </div> */}
        </div>
        <button type="submit">Add</button>
        <Link to="/admin/profile">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default NewPerfume;
