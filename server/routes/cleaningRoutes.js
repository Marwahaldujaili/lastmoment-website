import express from "express";
import { createCleaningProduct } from "../controllers/cleaningController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

router.post("/cleaning/new", authenticateAdmin, createCleaningProduct);

export default router;
