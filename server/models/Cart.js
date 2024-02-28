import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "items.productType", // Use refPath for dynamic referencing
    },
    productType: {
      type: String,
      required: true,
      enum: ["CleaningProduct", "Perfume"], // Specify the possible models
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const cartSchema = new Schema({
  sessionId: { type: String, required: true },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Session expires after 1 hour
});

const Cart = model("Cart", cartSchema);
export default Cart;
