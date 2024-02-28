import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AllCleaning.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const AllCleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/product/cleaning/viewall`);
        const data = await response.json();
        setCleaningProducts(data.data);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(cleaningProducts) && cleaningProducts.length > 0) {
      const groupByProductName = cleaningProducts.reduce((acc, product) => {
        const key = product.productName;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(product);
        return acc;
      }, {});

      setGroupedProducts(groupByProductName);
    }
  }, [cleaningProducts]);

  return (
    <div className="cleaning-prod-container">
      <h2>Our Cleaning Products</h2>
      {Object.entries(groupedProducts).map(([productName, products]) => (
        <div key={productName}>
          <h3>{productName}</h3>
          <div className="cleaning-prod">
            {products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  minWidth: 200,
                  maxWidth: { xs: 400, md: 600 },
                  margin: "10px",
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 10px 15px rgba(0,0,0,0.3)",
                  },
                  "@media (min-width:1024px)": {
                    maxWidth: 400,
                  },
                }}
              >
                <Link
                  to={`/cleaning/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="340"
                      image={product.mainImage}
                      alt={product.productName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.pricePerPiece} AED
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCleaning;
