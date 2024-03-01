import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Fab,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../styles/AllPerfume.scss";

const AllPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPerfumes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/product/perfume/viewall`
        );
        const data = await response.json();
        setPerfumes(data.data);
      } catch (error) {
        console.error("Failed to fetch perfumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfumes();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="perfume-container">
      <h1>Our Perfumes</h1>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {isLoading ? (
          <Typography sx={{ color: "white", fontSize: "24px" }}>
            Loading...
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {perfumes.map((perfume) => (
              <Grid item xs={12} sm={6} md={4} key={perfume._id}>
                <Card
                  sx={{
                    minWidth: 200,
                    maxWidth: { xs: 400, sm: 500, md: 600 },
                    margin: "10px auto",
                    position: "relative",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 10px 15px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  <Link
                    to={`/perfume/${perfume._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        max-height="320"
                        image={perfume.mainImage}
                        alt={perfume.productName}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {perfume.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {perfume.price} AED
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {visible && (
        <Fab
          color="white"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </div>
  );
};

export default AllPerfumes;
