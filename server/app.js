import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cleaningRoutes from "./routes/cleaningRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  })
);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(express.static("public"));
app.use("/product/cleaning", cleaningRoutes);
app.use("/product/perfume", perfumeRoutes);
app.use("/user/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
