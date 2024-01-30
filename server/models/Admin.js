import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false }, // Default to false for newly registered admins
  confirmationToken: { type: String },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
