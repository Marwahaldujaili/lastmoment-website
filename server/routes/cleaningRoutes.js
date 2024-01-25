import express from "express";
import {
  createCleaningProduct,
  deleteCleaningProduct,
  editCleaningProduct,
  getSingleCleaningProduct,
} from "../controllers/cleaningController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

router.post("/new", authenticateAdmin, createCleaningProduct);
router.put("/:productId/edit", authenticateAdmin, editCleaningProduct);
router.get("/:productId", getSingleCleaningProduct);
router.delete("/:productId/delete", authenticateAdmin, deleteCleaningProduct);

export default router;
