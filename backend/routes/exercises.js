import express from "express";
import { postExercise, getExercises, updateExercise, deleteExercise } from "../controllers/exercise.js";

const router = express.Router()

router.post("/", postExercise);
router.get("/:workoutId", getExercises);
router.put("/", updateExercise);
router.delete("/:id", deleteExercise);

export default router;