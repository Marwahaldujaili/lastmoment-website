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
const corsOptions = {
  origin: 'https://lastmoment-testing.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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
FRONT_END=http://localhost:3000 || https://lastmoment-testing.vercel.app/
