import express from "express";
import { postWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from "../controllers/workout.js";
import authToken from "../middlewares/authenticateToken.js";
import workoutsAllowed from "../middlewares/workoutsAllowed.js";

const router = express.Router()

router.post("/", authToken, postWorkout); //DONE
router.get("/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkouts); //DONE
router.get("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkout) //DONE
router.put("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, updateWorkout); //DONE
router.delete("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, deleteWorkout);

export default router;