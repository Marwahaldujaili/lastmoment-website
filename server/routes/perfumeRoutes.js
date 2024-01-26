import express from "express";
import {
  createPerfume,
  deletePerfume,
  editPerfume,
  viewPerfume,
  viewSinglePerfume,
} from "../controllers/perfumeController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";

const router = express.Router();

router.post("/new", authenticateAdmin, createPerfume);
router.get("/view", viewPerfume);
router.get("/:productId/view", viewSinglePerfume);
router.put("/:productId/edit", authenticateAdmin, editPerfume);
router.delete("/:productId/delete", authenticateAdmin, deletePerfume);

export default router;
