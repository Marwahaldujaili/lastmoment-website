import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const Cleaning = () => {
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    // Fetch all cleaning products when the component mounts
    const fetchCleaningProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/product/cleaning/view"
        );
        const data = await response.json();
        setCleaningProducts(data.data);

        // Set the selected card index to 0 when the component mounts
        if (data.data.length > 0) {
          console.log("Images array:", data.data[0].images);

          setSelectedCard(0);
        }
      } catch (error) {
        console.error("Error fetching cleaning products:", error);
      }
    };

    fetchCleaningProducts();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleCardClick = (index) => {
    // Toggle expanded state for the clicked card
    setExpandedCard((prevExpandedCard) =>
      prevExpandedCard === index ? null : index
    );
  };

  return (
    <div>
      <h2>All Cleaning Products</h2>
      <div>
        {cleaningProducts.map((product, index) => (
          <div key={product._id}>
            <h3>{product.productName}</h3>
            {product.images.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${product.images[0]}`}
                alt={product.productName}
                height="40"
              />
            )}
            {/* ... Other details ... */}
          </div>
        ))}
      </div>
    </div>

    // <div>
    //   <h2>All Cleaning Products</h2>

    //   <div>
    //     {cleaningProducts.map((product, index) => (
    //       <Card key={product._id}>
    //         <CardActionArea onClick={() => handleCardClick(index)}>
    //           bb
    //           {product.image && (
    //             <CardMed
    //               component="img"
    //               alt={product.productName}
    //               height="40"
    //               image={`http://localhost:5000/uploads/${product.images[0]}`} // Directly access the first element of the array
    //             />
    //           )}
    //           <CardContent>
    //             <Typography variant="h6" component="div">
    //               {product.productName}
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //         {expandedCard === index && (
    //           <CardContent>
    //             <Typography color="textSecondary">
    //               Scent: {product.scent}
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Capacity: {product.capacity}
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Quantity: {product.quantity}
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Price Per Carton: {product.pricePerCarton}
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Price Per Piece: {product.pricePerPiece}
    //             </Typography>
    //           </CardContent>
    //         )}
    //       </Card>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Cleaning;
