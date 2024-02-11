import React, { useState, useEffect } from "react";

const Cleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);

  useEffect(() => {
    // Fetch all cleaning products when the component mounts
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/product/cleaning/view"
        );
        const data = await response.json();
        setCleaningProducts(data.data);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      <h2>All Cleaning Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Scent</th>
            <th>Capacity</th>
            <th>Quantity</th>
            <th>Price Per Carton</th>
            <th>Price Per Piece</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cleaningProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.scent}</td>
              <td>{product.capacity}</td>
              <td>{product.quantity}</td>
              <td>{product.pricePerCarton}</td>
              <td>{product.pricePerPiece}</td>
              <td>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.productName}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cleaning;
