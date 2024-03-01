import express from "express";
import {
  addToCart,
  updateCart,
  viewCart,
  clearCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../controllers/cartController.js";
import {
  createCheckoutSession,
  handleStripeWebhook,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/checkoutController.js";
import bodyParser from "body-parser";

const router = express.Router();

// Add item to cart
router.post("/add", addToCart);

router.post("/update", updateCart);

router.post("/increase", increaseCartItemQuantity);
router.post("/decrease", decreaseCartItemQuantity);

// View cart
router.get("/view/:sessionId", viewCart);

// Clear cart
router.post("/clear/:sessionId", clearCart);

//checkout
router.post("/checkout", createCheckoutSession);

//webhook
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.get("/", getAllOrders); // List all orders (Admin)
router.get("/:id", getOrderById); // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status
router.delete("/:id", deleteOrder); // Delete an order

export default router;
