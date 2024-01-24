import express from "express";
import { registerNewAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/newadmin", registerNewAdmin);

export default router;
