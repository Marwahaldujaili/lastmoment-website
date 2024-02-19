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

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const AllCleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/product/cleaning/view`);
        const data = await response.json();
        const productsWithImageState = data.data.map((product) => ({
          ...product,
          currentImage: "mainImage",
        }));
        setCleaningProducts(productsWithImageState);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []);

  useEffect(() => {
    const groupByProductName = cleaningProducts.reduce((acc, product) => {
      const key = product.productName;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    }, {});

    setGroupedProducts(groupByProductName);
  }, [cleaningProducts]);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleImage = (id) => {
    setCleaningProducts(
      cleaningProducts.map((product) => {
        if (product._id === id) {
          const hasDetailsImage =
            product.detailsImage && product.detailsImage.trim() !== "";
          return {
            ...product,
            currentImage:
              product.currentImage === "mainImage" && hasDetailsImage
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
      <h2>Cleaning Products</h2>
      {Object.entries(groupedProducts).map(([productName, products]) => (
        <div key={productName}>
          <h3>{productName}</h3>
          <div className="cleaning-prod">
            {products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  minWidth: 200,
                  maxWidth: { xs: 200, md: 600 },
                  margin: "10px",
                  position: "relative",
                  "@media (min-width:1024px)": {
                    width: 400,
                    maxWidth: 600,
                  },
                }}
              >
                <CardActionArea>
                  <div className="image-container">
                    <CardMedia
                      component="img"
                      height="300"
                      image={product[product.currentImage]}
                      alt={`${product.productName} - ${
                        product.currentImage === "mainImage"
                          ? "Main"
                          : "Details"
                      }`}
                      onClick={() => {
                        setSelectedImage(product[product.currentImage]);
                        setOpenModal(true);
                      }}
                      style={{
                        cursor: "zoom-in",
                        height: { xs: 200, md: 400 },
                        width: { xs: 200, md: 400 },
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
                  <CardContent
                    sx={{
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    {" "}
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      onClick={() => handleExpandClick(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.scent} {product.productName}
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
        </div>
      ))}
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
            "@media (min-width:1024px)": {
              width: 600, // Larger width for screens wider than 1024px
              // You can also adjust other styles here if needed, for example:
              p: 6,
            },
          }}
        >
          <img
            src={selectedImage}
            alt="Zoomed In"
            style={{
              width: "100%",
              maxHeight: "80vh",
              "@media (min-width:1024px)": {
                maxHeight: "90vh", // Optionally adjust the maxHeight for larger screens
              },
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AllCleaning;
