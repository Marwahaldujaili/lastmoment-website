import React, { useState, useEffect } from "react";
import '../styles/AllCleaning.scss'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AllCleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    // Fetch cleaning products data from your API endpoint
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/cleaning/view");
        const data = await response.json();
        setCleaningProducts(data.data);
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []);

  return (
    <div className="cleaning-prod-container">
      <h1>Cleaning Products</h1>
      <div className="cleaning-prod">
        {cleaningProducts.map((product) => (
          <Card key={product._id} sx={{ minWidth: 300, maxWidth: 300, margin: "10px" }}>
            <CardActionArea onClick={() => handleExpandClick(product._id)}>
              <CardMedia
                component="img"
                height="140"
                image={product.mainImage}
                alt={`${product.productName} - Main`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scent: {product.scent}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Collapse in={expandedId === product._id} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                Price: {product.pricePerPiece} AED
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCleaning;
