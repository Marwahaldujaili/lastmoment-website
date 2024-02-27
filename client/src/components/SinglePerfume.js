import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid, Button } from "@mui/material";
import { getSessionId } from "../utils/sessionUtils"; // Adjust the path as necessary

const SinglePerfume = () => {
  const { perfumeId } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/product/perfume/${perfumeId}`)
      .then((res) => res.json())
      .then((data) => {
        setPerfume(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching perfume details:", err);
        setIsLoading(false);
      });
  }, [perfumeId]);

  const handleAddToCart = async () => {
    const sessionId = getSessionId(); // Retrieve or generate a session ID

    const payload = {
      sessionId,
      productId: perfumeId,
      quantity: 1, // Example quantity
      productType: "perfume",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Perfume added to cart successfully!");
      } else {
        alert(data.message || "Failed to add perfume to cart.");
      }
    } catch (error) {
      console.error("Error adding perfume to cart:", error);
      alert("Error adding perfume to cart.");
    }
  };

  if (isLoading) return <p>Loading perfume details...</p>;
  if (!perfume) return <p>Perfume not found.</p>;

  return (
    <div className="perfume-container">
      <h1>{perfume.productName}</h1>
      <Box
        sx={{
          maxWidth: {
            xs: 400, // max-width of 400px on extra-small devices (mobile)
            sm: 600, // max-width of 600px on small devices (tablets)
            md: 800, // max-width of 800px on medium devices and up (desktops)
          },
          m: "auto",
          mt: 1,
          p: 3,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={perfume.mainImage}
              alt={perfume.productName}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h6" component="h2">
              {perfume.productName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Capacity: {perfume.capacity}ml
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Description: {perfume.description}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Price: {perfume.price} AED
            </Typography>
            <Button
              onClick={handleAddToCart}
              sx={{
                mt: 2,
                backgroundColor: "#f05b3f",
                color: "white",
                "&:hover": {
                  backgroundColor: "#8c3027",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SinglePerfume;
