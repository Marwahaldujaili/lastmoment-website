import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendConfirmationEmail } from "../middleware/sendConfirmationEmail.js";

const CONFIRMATION_SECRET = "askmeifyouwannaknow";
const FRONT_END_URL = "http://localhost:3000" || "http://192.168.100.119:3000";

//register new admin
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

    // confirmation

    const confirmationToken = jwt.sign({ email }, CONFIRMATION_SECRET, {
      expiresIn: "1h",
    });
    // Create a new admin user with unconfirmed status
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      confirmed: false,
      confirmationToken,
    });
    // Save the new admin user to the database
    await newAdmin.save();
    // Send confirmation email
    sendConfirmationEmail(email, confirmationToken); // Pass email and confirmationToken as arguments
    // Generate JWT token
    const token = jwt.sign(
      { userId: newAdmin._id, email: newAdmin.email },
      "askmeifyouwannaknow", //change and place it in env
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).json({ success: true, data: { admin: newAdmin, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// confirm
export const getConfirmation = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("Received confirmation token:", token);

    // Verify the token
    const decoded = jwt.verify(token, CONFIRMATION_SECRET);
    console.log("Decoded token:", decoded);
    const email = decoded.email;

    // Find the admin in the database using the email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.error("Admin not found");

      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    // Update the confirmed status to true
    admin.confirmed = true;
    await admin.save();
    console.log("Admin confirmed:", admin);

    // Redirect to the login page after successful confirmation
    res.redirect(`${FRONT_END_URL}`);
  } catch (error) {
    console.error("Error confirming email:", error);
    // Handle token verification errors or other issues
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// login

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", req.body);

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

// view admin profile
export const viewAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id;
    //find admin

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
};
//logout
export const logoutAdmin = (req, res) => {
  try {
    // Clear the JWT cookie to log out the admin
    res.clearCookie("jwt", { httpOnly: true, secure: true });

    res
      .status(200)
      .json({ success: true, message: "Admin logged out successfully" });
  } catch (error) {
    console.error("Error logging out admin:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// edit
export const editAdmin = async (req, res) => {
  try {
    const { email } = req.admin; // Assuming the email is used as a unique identifier

    // Fetch the admin from the database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    // Update the admin's information based on the request body
    // Example: Update the admin's email
    if (req.body.newEmail) {
      admin.email = req.body.newEmail;
    }
    // Save the updated admin information to the database
    await admin.save();

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//
export const changeAdminPassword = async (req, res) => {
  try {
    const { email } = req.admin;

    // Fetch the admin from the database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    const { currentPassword, newPassword } = req.body;

    // Check if the provided current password matches the stored password
    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    admin.password = hashedNewPassword;

    // Save the updated admin information
    await admin.save();

    console.log("Request Body:", req.body);
    console.log("Current Password:", req.body.currentPassword);
    console.log("New Password:", req.body.newPassword);

    res
      .status(200)
      .json({ success: true, data: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
