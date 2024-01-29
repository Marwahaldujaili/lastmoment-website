import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    // Get the token from the request cookies
    const token = req.cookies.jwt;

    // Verify the token
    const decodedToken = jwt.verify(token, "yourSecretKey");

    // Check if the decoded token contains user information
    if (decodedToken && decodedToken.email) {
      // Fetch the user from the database
      const admin = await Admin.findOne({ email: decodedToken.email });

      // Check if the user exists and has admin privileges
      if (admin) {
        // Attach the user information to the request object
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
