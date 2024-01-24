import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cleaningProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    scent: String,
    capacity: String,
    quantity: Number,
    pricePerCarton: String,
    pricePerPiece: String,
    image: String,
  },
  {
    versionKey: false, // Set versionKey to false to disable the __v field
  }
);

const CleaningProduct = mongoose.model(
  "CleaningProduct",
  cleaningProductSchema
);
export default CleaningProduct;
