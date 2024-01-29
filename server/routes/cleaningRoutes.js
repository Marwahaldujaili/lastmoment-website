import express from "express";
import {
  createCleaningProduct,
  deleteCleaningProduct,
  editCleaningProduct,
  getSingleCleaningProduct,
  viewAllCleaning,
} from "../controllers/cleaningController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

router.post("/new", authenticateAdmin, createCleaningProduct);
router.put("/:productId/edit", authenticateAdmin, editCleaningProduct);
router.get("/:productId/view", getSingleCleaningProduct);
router.get("/view", viewAllCleaning);
router.delete("/:productId/delete", authenticateAdmin, deleteCleaningProduct);

export default router;
