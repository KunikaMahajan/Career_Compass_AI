import express from "express";
import {
  predictCareer,
  askCareerAI
} from "../controllers/careerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ ONLY ONE ROUTE EACH
router.post("/predict", authMiddleware, predictCareer);
router.post("/career-chat", authMiddleware, askCareerAI);

export default router;