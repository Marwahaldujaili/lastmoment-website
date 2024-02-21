import express from "express";
import {
  addToCart,
  updateCart,
  viewCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add item to cart
router.post("/add", addToCart);

router.post("/update", updateCart);

// View cart
router.get("/view/:sessionId", viewCart);

// Clear cart
router.post("/clear/:sessionId", clearCart);

export default router;
