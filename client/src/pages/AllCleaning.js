import React, { useState, useEffect } from "react";
import "../styles/AllCleaning.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Modal, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllCleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/product/cleaning/view"
        );
        const data = await response.json();
        const productsWithImageState = data.data.map((product) => ({
          ...product,
          currentImage: "mainImage", // Initialize with 'mainImage'
        }));
        setCleaningProducts(productsWithImageState);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []);

  const toggleImage = (id) => {
    setCleaningProducts(
      cleaningProducts.map((product) => {
        if (product._id === id) {
          return {
            ...product,
            currentImage:
              product.currentImage === "mainImage"
                ? "detailsImage"
                : "mainImage",
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="cleaning-prod-container">
      <h1>Cleaning Products</h1>
      <div className="cleaning-prod">
        {cleaningProducts.map((product) => (
          <Card
            key={product._id}
            sx={{
              minWidth: 300,
              maxWidth: 300,
              margin: "10px",
              position: "relative",
            }}
          >
            <CardActionArea>
              <div className="image-container">
                <CardMedia
                  component="img"
                  height="200"
                  image={product[product.currentImage]}
                  alt={`${product.productName} - ${
                    product.currentImage === "mainImage" ? "Main" : "Details"
                  }`}
                  onClick={() => {
                    setSelectedImage(product[product.currentImage]);
                    setOpenModal(true);
                  }}
                />
                <IconButton
                  className="image-switch-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImage(product._id);
                  }}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "0%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {product.currentImage === "mainImage" ? (
                    <ArrowForwardIosIcon />
                  ) : (
                    <ArrowBackIosIcon />
                  )}
                </IconButton>
              </div>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={() => handleExpandClick(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.productName}
                  <br />
                  <ExpandMoreIcon />
                </Typography>
              </CardContent>
            </CardActionArea>
            <Collapse
              in={expandedId === product._id}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Scent: {product.scent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.pricePerPiece} AED
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <img src={selectedImage} alt="Zoomed In" style={{ width: "100%" }} />
        </Box>
      </Modal>
    </div>
  );
};

export default AllCleaning;
