import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const perfumeSchema = new Schema({
  productName: { type: String, required: true },
  capacity: String,
  price: Number,
  discountedPrice: Number,
  description: String,
  image: String,
});

const Perfume = mongoose.model("Perfume", perfumeSchema);
export default Perfume;
