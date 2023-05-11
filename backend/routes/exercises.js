import express from "express";
import { postExercise, getExercises, updateExercise, deleteExercise } from "../controllers/exercise.js";
import authToken from "../middlewares/authenticateToken.js";
import exercisesAllowed from "../middlewares/exercisesAllowed.js";

const router = express.Router()

router.post("/workouts/:workoutId", authToken, exercisesAllowed, postExercise); //DONE
router.get("/workouts/:workoutId", authToken, exercisesAllowed, getExercises); //DONE
router.put("/:exerciseId/workouts/:workoutId", authToken, exercisesAllowed, updateExercise); //DONE
router.delete("/:exerciseId/workouts/:workoutId", authToken, exercisesAllowed, deleteExercise); //DONE

export default router;