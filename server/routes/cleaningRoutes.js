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
import compressImages from "../middleware/compressImages.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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

// const compressImage = async (fieldName, file) => {
//   const buffer = file?.buffer;

//   if (buffer) {
//     console.log(`Original Buffer Length for ${fieldName}:`, buffer.length);

//     try {
//       file.buffer = await sharp(buffer)
//         .resize({ width: 800, height: 600 })
//         .toBuffer();
//       console.log(
//         `Processed Buffer Length for ${fieldName}:`,
//         file.buffer.length
//       );
//     } catch (sharpError) {
//       console.error(`Sharp Error for ${fieldName}:`, sharpError.message);
//       throw sharpError;
//     }
//   } else {
//     console.warn(`Buffer is undefined for field: ${fieldName}`);
//   }
// };

// const compressImages = async (req, res, next) => {
//   try {
//     if (req.files) {
//       await Promise.all(
//         Object.entries(req.files).map(async ([fieldName, files]) => {
//           if (Array.isArray(files)) {
//             // Handle the case where files is an array
//             await Promise.all(
//               files.map(async (file) => {
//                 await compressImage(fieldName, file);
//               })
//             );
//           } else {
//             // Handle the case where files is a single file
//             await compressImage(fieldName, files);
//           }
//         })
//       );
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

router.post(
  "/new",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  compressImages,
  createCleaningProduct
);

router.put(
  "/:productId/edit",
  authenticateAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
  ]),
  compressImages,
  editCleaningProduct
);

router.get("/:productId/view", getSingleCleaningProduct);
router.get("/view", viewAllCleaning);
router.delete("/:productId/delete", authenticateAdmin, deleteCleaningProduct);

export default router;
