import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Fab,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../styles/AllCleaning.scss";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const AllCleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCleaningProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/product/cleaning/viewall`);
        const data = await response.json();
        setCleaningProducts(data.data);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      } finally {
        setIsLoading(false);
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

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
    const categoryKey = Object.keys(groupedProducts)[newValue];
    const element = document.getElementById(categoryKey);

    if (element) {
      const headerOffset = 80; // Height of the tabs bar, adjust this value as needed
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="cleaning-prod-container">
      <h2>Our Cleaning Products</h2>
      {isLoading ? (
        <Typography
          sx={{
            color: "ebebeb",
            fontSize: "24px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Loading...
        </Typography>
      ) : (
        Object.entries(groupedProducts).map(([productName, products]) => (
          <Box key={productName} sx={{ marginBottom: "20px" }} id={productName}>
            <Typography sx={{ marginBottom: "16px" }}>
              <Box sx={{ width: "100%", overflowX: "hidden" }}>
                <Tabs
                  value={activeTab}
                  onChange={handleChangeTab}
                  variant="standard"
                  aria-label="scrollable auto tabs example"
                  sx={{
                    ".MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                      justifyContent: "center",
                    },
                    ".MuiTab-root": {
                      padding: "5px",
                      backgroundColor: "#f05b3f",
                      margin: "5px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "4px",
                      color: "#ebebeb",
                      transition: "0.5s",
                      "&:hover": {
                        backgroundColor: "#8c3027",
                      },
                    },
                    ".Mui-selected": {
                      color: "#ebebeb",
                      backgroundColor: "#8c3027",
                      boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)",
                    },
                    ".MuiTabs-indicator": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {Object.keys(groupedProducts).map((category, index) => (
                    <Tab label={category} key={index} />
                  ))}
                </Tabs>
              </Box>
              {/* {productName} */}
            </Typography>
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
          </Box>
        ))
      )}
      {visible && (
        <Fab
          color="ebebeb"
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

export default AllCleaning;
