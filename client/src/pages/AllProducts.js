import React from "react";
import AllCleaning from "./AllCleaning";
import AllPerfumes from "./AllPerfumes";
import "../styles/AllProducts.scss";

function AllProducts() {
  return (
    <div className="container">
      <h1>Our products</h1>
      <p>Browse all our products</p>
      <AllPerfumes />
      <AllCleaning />
    </div>
  );
}

export default AllProducts;
