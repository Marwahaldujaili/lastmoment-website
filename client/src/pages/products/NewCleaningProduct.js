import React, { useState } from "react";

function NewCleaningProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    scent: "",
    capacity: "",
    quantity: "",
    pricePerCarton: "",
    pricePerPiece: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/product/cleaning/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Product created", data); //redirect the user to product list
      } else {
        console.log("Error", data.error);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div>
      <h1>Create Cleaning Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Add your input fields here */}
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </label>
        {/* Repeat similar input fields for other properties */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewCleaningProduct;
