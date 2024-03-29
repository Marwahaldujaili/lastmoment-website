import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cleaningProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    scent: String,
    capacity: String,
    quantity: Number,
    pricePerCarton: Number,
    pricePerPiece: Number,
    mainImage: String,
    detailsImage: String,
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
