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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cleaning/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

router.post(
  "/new",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  createCleaningProduct
);

router.put(
  "/:productId/edit",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  editCleaningProduct
);
router.get("/viewall", viewAllCleaning);

router.get("/:productId", getSingleCleaningProduct);

router.delete("/:productId/delete", authenticateAdmin, deleteCleaningProduct);

export default router;
