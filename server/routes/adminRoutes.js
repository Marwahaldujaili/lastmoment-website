import express from "express";
import {
  loginAdmin,
  registerNewAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/newadmin", registerNewAdmin);
router.get("/adminlogin", loginAdmin);

export default router;
