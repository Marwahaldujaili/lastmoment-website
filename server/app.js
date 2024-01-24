import express from "express";
import mongoose from "mongoose";
import cleaningRoutes from "./routes/cleaningRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 3000;
const DB_URI =
  "mongodb+srv://marwah:mad1983bremen@mad.c3dwjnj.mongodb.net/lastmoment";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/product", cleaningRoutes);
app.use("/user/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
