import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cleaningRoutes from "./routes/cleaningRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cookieParser()); // Add this line to use cookie-parser middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);
const PORT = 5000;
const DB_URI =
  "mongodb+srv://marwah:mad1983bremen@mad.c3dwjnj.mongodb.net/lastmoment";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Use a unique filename for each uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use("/product/cleaning", cleaningRoutes);
app.use("/product/perfume", perfumeRoutes);
app.use("/user/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
