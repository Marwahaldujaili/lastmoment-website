import express from "express";
import { createCleaningProduct } from "../controllers/cleaningController.js";

const router = express.Router();

router.post("/cleaning/new", createCleaningProduct);

export default router;
