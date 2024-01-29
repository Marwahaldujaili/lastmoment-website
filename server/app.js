import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cleaningRoutes from "./routes/cleaningRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import cors from "cors";

const app = express();
app.use(cookieParser()); // Add this line to use cookie-parser middleware
app.use(cors());
const PORT = 5000;
const DB_URI =
  "mongodb+srv://marwah:mad1983bremen@mad.c3dwjnj.mongodb.net/lastmoment";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/product/cleaning", cleaningRoutes);
app.use("/product/perfume", perfumeRoutes);
app.use("/user/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
