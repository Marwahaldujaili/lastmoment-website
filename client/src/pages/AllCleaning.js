import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cleaningProducts.map((product) => (
          <Card key={product._id} style={{ margin: "10px", width: "200px" }}>
            {product.image && (
              <CardMedia
                component="images"
                alt={product.productName}
                height="140"
                images={product.images}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {product.productName}
              </Typography>
              <Typography color="textSecondary">
                Scent: {product.scent}
              </Typography>
              <Typography color="textSecondary">
                Capacity: {product.capacity}
              </Typography>
              <Typography color="textSecondary">
                Quantity: {product.quantity}
              </Typography>
              <Typography color="textSecondary">
                Price Per Carton: {product.pricePerCarton}
              </Typography>
              <Typography color="textSecondary">
                Price Per Piece: {product.pricePerPiece}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cleaning;
