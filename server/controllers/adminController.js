import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerNewAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username is already taken
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, error: "This email is already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });
    // Save the new admin user to the database
    await newAdmin.save();
    // Generate JWT token
    const token = jwt.sign(
      { userId: newAdmin._id, email: newAdmin.email },
      "yourSecretKey", //change and place it in env
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
      httpOnly: true, // Cookie is only accessible through HTTP(S) requests
      maxAge: 3600000, // Token expiration time in milliseconds (1 hour in this example)
      secure: true, //process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
    });

    // Respond with the token and user data
    res.status(201).json({ success: true, data: { admin: newAdmin, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//////

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the admin user by email
    const admin = await Admin.findOne({ email });

    // Check if the admin exists
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      "yourSecretKey", //change and place it in env
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
      httpOnly: true, // Cookie is only accessible through HTTP(S) requests
      maxAge: 3600000, // Token expiration time in milliseconds (1 hour in this example)
      secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
    });

    // Respond with the token and admin data
    res.status(200).json({ success: true, data: { admin, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
