import express from "express";
import { postExercise, getExercises, updateExercise, deleteExercise } from "../controllers/exercise.js";

const router = express.Router()

router.post("/", postExercise);
router.get("/", getExercises);
router.put("/", updateExercise);
router.delete("/", deleteExercise);

export default router;