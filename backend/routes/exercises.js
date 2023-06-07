import express from "express";
import { postExercise, getExercises, updateExercise, deleteExercise } from "../controllers/exercise.js";
import authToken from "../middlewares/authenticateToken.js";
import exercisesAllowed from "../middlewares/exercisesAllowed.js";

const router = express.Router()

router.post("/workouts/:workoutId", authToken, exercisesAllowed, postExercise); 
router.get("/workouts/:workoutId", authToken, exercisesAllowed, getExercises); 
router.put("/:exerciseId/workouts/:workoutId", authToken, exercisesAllowed, updateExercise); 
router.delete("/:exerciseId/workouts/:workoutId", authToken, exercisesAllowed, deleteExercise); 

export default router;