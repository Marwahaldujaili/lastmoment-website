import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { getSessionId } from "../utils/sessionUtils"; // Adjust based on your file structure

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const aggregateCartItems = (items) => {
    const aggregatedItemsMap = items.reduce((acc, item) => {
      const name = item.productDetails.productName;

      if (!acc[name]) {
        acc[name] = { ...item, quantity: 0 }; // Initialize if not exist
      }

      acc[name].quantity += item.quantity; // Sum up quantities
      return acc;
    }, {});

    // Convert the aggregated items map back to an array
    return Object.values(aggregatedItemsMap);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const sessionId = getSessionId();
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/cart/view/${sessionId}`
        );
        const data = await response.json();
        if (data.success && data.cart) {
          const aggregatedItems = aggregateCartItems(data.cart.items);
          setCartItems(aggregatedItems);
          setTotalPrice(data.cart.totalPrice);
        } else {
          console.error("Failed to fetch cart items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (isLoading) return <Typography>Loading cart...</Typography>;
  if (!cartItems.length) return <Typography>Your cart is empty.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${
                item.productDetails.productName || "Product"
              } - Quantity: ${item.quantity}`}
              secondary={`Item Price: ${item.price} AED`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total Price: {totalPrice} AED</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
