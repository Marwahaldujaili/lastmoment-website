import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getSessionId } from "../utils/sessionUtils";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState({
    items: [],
    totalPrice: 0,
    deliveryCost: 25,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const sessionId = getSessionId();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/cart/view/${sessionId}`
      );
      const data = await response.json();
      if (data.success && data.cart) {
        setCartDetails({
          items: data.cart.items,
          totalPrice: data.cart.totalPrice,
          deliveryCost: data.cart.deliveryCost,
        });
      } else {
        console.error("Failed to fetch cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateItemQuantity = async (productId, change) => {
    const sessionId = getSessionId();
    const endpoint =
      change === "increase" ? "/cart/increase" : "/cart/decrease";
    try {
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          productId,
          quantity: change === "increase" ? 1 : -1,
        }),
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleCheckout = async () => {
    const sessionId = getSessionId();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/cart/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }
      );
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const finalTotalPrice = cartDetails.totalPrice;

  if (isLoading) return <Typography>Loading cart...</Typography>;
  if (!cartDetails.items.length) {
    return (
      <div className="perfume-container">
        <h1>Shopping Cart</h1>
        <Box
          sx={{
            maxWidth: { xs: 400, sm: 600, md: 800 },
            minWidth: "80%",
            m: "auto",
            mt: 2,
            p: 10,
            boxShadow: 3,
            bgcolor: "white",
          }}
        >
          <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
            No items in the cart
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div className="perfume-container">
      <h1>Shopping Cart</h1>
      <Box
        sx={{
          maxWidth: { xs: 400, sm: 600, md: 800 },
          minWidth: "80%",
          m: "auto",
          mt: 1,
          p: 3,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <List>
          {cartDetails.items.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={`${item.productDetails?.productName || "Product"}`}
                secondary={`Item Price: ${item.price} AED`}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => updateItemQuantity(item.productId, "decrease")}
                  size="small"
                  sx={{
                    marginRight: 1,
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  onClick={() => updateItemQuantity(item.productId, "increase")}
                  size="small"
                  sx={{
                    marginLeft: 1,
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemText primary="Delivery Cost within UAE" />
            <Typography>{cartDetails.deliveryCost} AED</Typography>
          </ListItem>
        </List>

        <Typography variant="h6">Total: {finalTotalPrice} AED</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#f05b3f",
              color: "#f05b3f",
              "&:hover": {
                backgroundColor: "#8c3027",
                borderColor: "#8c3027",
                color: "white",
              },
            }}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f05b3f",
              color: "white",
              "&:hover": {
                backgroundColor: "#8c3027",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              },
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Cart;
