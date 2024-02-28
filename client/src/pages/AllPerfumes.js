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
} from "@mui/material";
import "../styles/AllPerfume.scss";

const AllPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="perfume-container">
      <h1>Our Perfumes</h1>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={4}>
            {perfumes.map((perfume) => (
              <Grid item xs={12} sm={6} md={4} key={perfume._id}>
                <Card
                  sx={{
                    minWidth: 100,
                    maxWidth: { xs: 200, md: 400 },
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
                    to={`/perfume/${perfume._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="320"
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
    </div>
  );
};

export default AllPerfumes;
