import express from "express";
import multer from "multer";
import {
  createPerfume,
  deletePerfume,
  editPerfume,
  viewAllPerfumes,
  viewSinglePerfume,
} from "../controllers/perfumeController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

// Configure multer storage and file filtering
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/perfume/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Routes
router.post(
  "/new",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  createPerfume
);

router.get("/viewall", viewAllPerfumes);
router.get("/:productId", viewSinglePerfume);

router.put(
  "/:productId/edit",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  editPerfume
);

router.delete("/:productId/delete", authenticateAdmin, deletePerfume);

export default router;
