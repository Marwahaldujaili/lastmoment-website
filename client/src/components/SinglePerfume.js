import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSessionId } from "../utils/sessionUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SinglePerfume = () => {
  const { perfumeId } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
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
    const sessionId = getSessionId();

    const payload = {
      sessionId,
      productId: perfumeId,
      quantity: 1,
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
        toast.success("Product added to cart successfully!");
      } else {
        toast.error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding perfume to cart:", error);
      toast.error("Error adding product to cart.");
    }
  };

  const toggleModal = () => setOpenModal(!openModal);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  if (isLoading) return <p>Loading perfume details...</p>;
  if (!perfume) return <p>Perfume not found.</p>;

  return (
    <div className="perfume-container">
      <h1>{perfume.productName}</h1>
      <Box
        sx={{
          position: "relative",
          maxWidth: {
            xs: 400,
            sm: 600,
            md: 800,
          },
          maxHeight: "75%",
          m: "auto",
          mt: 1,
          p: 1,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "white",
            backgroundColor: "#f05b3f",
            "&:hover": {
              backgroundColor: "#8c3027",
              color: "white",
            },
          }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={perfume.mainImage}
              alt={perfume.productName}
              style={{
                cursor: "zoom-in",
                width: "100%",
                height: "auto",
                display: "block",
              }}
              onClick={toggleModal}
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
      <Modal
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={toggleModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={perfume.mainImage}
            alt={perfume.productName}
            style={{ width: "100%", height: "80%", display: "block" }}
          />
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SinglePerfume;
