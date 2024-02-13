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

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Preserve the original file extension
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/new",
  authenticateAdmin,
  upload.array("images"), // Ensure that "images" matches the field name in the form
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
