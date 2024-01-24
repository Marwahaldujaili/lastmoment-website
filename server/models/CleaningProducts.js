import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cleaningProductSchema = new Schema(
  {
    productName: { type: String, required: true, unique: true },
    scent: String,
    capacity: String,
    quantity: Number,
    pricePerCarton: String,
    pricePerPiece: String,
    image: String,
  },
  {
    versionKey: false,
  }
);

const CleaningProduct = mongoose.model(
  "CleaningProduct",
  cleaningProductSchema
);
export default CleaningProduct;
