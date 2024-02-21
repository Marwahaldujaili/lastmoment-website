import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cleaningRoutes from "./routes/cleaningRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();
app.use(cookieParser());

app.use(
  cors((req, callback) => {
    const allowedOrigins = ["https://lastmoment-testing.vercel.app"]; // List your origins
    const origin = req.header("Origin");
    let corsOptions = { origin: false }; // Disallow CORS by default

    if (allowedOrigins.includes(origin)) {
      corsOptions.origin = origin; // Reflect the request origin
    }

    callback(null, corsOptions); // Callback expects two parameters: error and options
  })
);

app.use(
  session({
    secret: "yourSecretKey", // A secret key for signing the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Don't create session until something stored
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // Cookie settings
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
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
