import express from "express";
import {
  loginAdmin,
  registerNewAdmin,
  editAdmin,
  changeAdminPassword,
  getConfirmation,
  viewAdminProfile,
  logoutAdmin,
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

router.post("/newadmin", registerNewAdmin);
router.get("/confirm/:token", getConfirmation);
router.post("/adminlogin", loginAdmin);
router.get("/profile", authenticateAdmin, viewAdminProfile);
router.post("/logout", logoutAdmin);
router.put("/edit", authenticateAdmin, editAdmin);
router.put("/changepassword", authenticateAdmin, changeAdminPassword);

export default router;
