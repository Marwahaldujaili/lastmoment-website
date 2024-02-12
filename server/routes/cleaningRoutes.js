// cleaningRoutes.js
import express from "express";
import multer from "multer";
import {
  createCleaningProduct,
  deleteCleaningProduct,
  editCleaningProduct,
  getSingleCleaningProduct,
  viewAllCleaning,
} from "../controllers/cleaningController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/new",
  upload.array("images", 5), // Ensure that "images" matches the field name in the form
  authenticateAdmin,
  createCleaningProduct
);

router.put(
  "/:productId/edit",
  authenticateAdmin,
  upload.array("images"),
  editCleaningProduct
);
router.get("/:productId/view", getSingleCleaningProduct);
router.get("/view", viewAllCleaning);
router.delete("/:productId/delete", authenticateAdmin, deleteCleaningProduct);

export default router;
