import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendConfirmationEmail } from "../middleware/sendConfirmationEmail.js";

//register new admin
export const registerNewAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, error: "This email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const confirmationToken = jwt.sign(
      { email },
      process.env.CONFIRMATION_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      confirmed: false,
      confirmationToken,
    });
    await newAdmin.save();
    sendConfirmationEmail(email, confirmationToken);
    const token = jwt.sign(
      { userId: newAdmin._id, email: newAdmin.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
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
    const decoded = jwt.verify(token, process.env.CONFIRMATION_SECRET);
    const email = decoded.email;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    admin.confirmed = true;
    await admin.save();
    res.redirect(`${FRONT_END_URL}`);
  } catch (error) {
    console.error("Error confirming email:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// adminlogin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
    });
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
    const { email } = req.admin;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    if (req.body.newEmail) {
      admin.email = req.body.newEmail;
    }
    await admin.save();
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//change pass
export const changeAdminPassword = async (req, res) => {
  try {
    const { email } = req.admin;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    const { currentPassword, newPassword } = req.body;
    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect current password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();
    res
      .status(200)
      .json({ success: true, data: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
