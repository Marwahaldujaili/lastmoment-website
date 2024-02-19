import React, { useState, useEffect } from "react";
import "../styles/AllPerfume.scss"; // Ensure this file exists and is styled appropriately
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Modal, Box } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const AllPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/product/perfume/view"
        );
        const data = await response.json();
        setPerfumes(data.data);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
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
              maxWidth: 200,
              margin: "10px",
              position: "relative",
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
            />
            <CardContent>
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
            {/* <ExpandMore
              expand={expandedId === perfume._id}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering any parent button actions
                handleExpandClick(perfume._id);
              }}
              aria-expanded={expandedId === perfume._id}
              aria-label="show more"
              style={{
                marginLeft: "auto",
                marginRight: "16px",
                marginBottom: "8px",
              }} // Adjust as needed for layout
            >
            </ExpandMore> */}
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
          <img
            src={selectedImage}
            alt="Zoomed In"
            style={{ width: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AllPerfumes;
