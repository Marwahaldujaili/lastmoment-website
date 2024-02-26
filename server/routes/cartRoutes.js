import express from "express";
import {
  addToCart,
  updateCart,
  viewCart,
  clearCart,
} from "../controllers/cartController.js";
import {
  createCheckoutSession,
  handleStripeWebhook,
} from "../controllers/checkoutController.js";
import bodyParser from "body-parser";

const router = express.Router();

// Add item to cart
router.post("/add", addToCart);

router.post("/update", updateCart);

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

export default router;
