import express from "express";
import { postExercise, getExercises, updateExercise, deleteExercise } from "../controllers/exercise.js";
import authToken from "../middlewares/authenticateToken.js";
import exercisesAllowed from "../middlewares/exercisesAllowed.js";

const router = express.Router()

router.post("/", authToken, postExercise);
router.get("/:workoutId", authToken, exercisesAllowed, getExercises);
router.put("/", authToken, updateExercise);
router.delete("/:id", authToken, deleteExercise);

export default router;