import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "yourSecretKey");
    if (decodedToken && decodedToken.email) {
      const admin = await Admin.findOne({ email: decodedToken.email });
      if (admin) {
        req.admin = admin;
        next();
      } else {
        res.status(403).json({ success: false, error: "Unauthorized access" });
      }
    } else {
      res.status(401).json({ success: false, error: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { authenticateAdmin };
