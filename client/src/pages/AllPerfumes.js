import React, { useState, useEffect } from "react";
import "../styles/AllPerfume.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Modal, Box } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const AllPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPerfumes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/product/perfume/view`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setPerfumes(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfumes();
  }, []);
  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="perfume-container">
      <h1>Perfume Products</h1>
      <div className="perfume-grid">
        {perfumes.map((perfume) => (
          <Card
            key={perfume._id}
            sx={{
              minWidth: 100,
              maxWidth: { xs: 200, md: 400 }, // 'md' corresponds to 900px by default, adjust as needed
              margin: "10px",
              position: "relative",
              // Use a media query to apply different styles for screens >1024px
              "@media (min-width:1024px)": {
                maxWidth: 400, // Increase maxWidth for screens wider than 1024px
                // Add any other style adjustments here
              },
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={perfume.mainImage}
              alt={perfume.productName}
              onClick={() => {
                setSelectedImage(perfume.mainImage);
                setOpenModal(true);
              }}
              style={{ cursor: "zoom-in" }}
            />
            <CardContent
              sx={{
                backgroundColor: "whitesmoke",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                onClick={() => handleExpandClick(perfume._id)}
                style={{ cursor: "pointer" }}
              >
                {perfume.productName} <br />
                <ExpandMoreIcon />
              </Typography>
              <Collapse
                in={expandedId === perfume._id}
                timeout="auto"
                unmountOnExit
              >
                <Typography variant="body2" color="text.secondary">
                  <b>Capacity:</b> {perfume.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Price:</b> {perfume.price} AED
                </Typography>
                {perfume.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <b>Aromatic Bases:</b> <br />
                    {perfume.description}
                  </Typography>
                )}
              </Collapse>
            </CardContent>
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

export default AllPerfumes;
