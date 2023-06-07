import express from "express";
import { postWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from "../controllers/workout.js";
import authToken from "../middlewares/authenticateToken.js";
import workoutsAllowed from "../middlewares/workoutsAllowed.js";

const router = express.Router()

router.post("/workoutPlans/:workout_planId", authToken, workoutsAllowed, postWorkout); 
router.get("/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkouts); 
router.get("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkout) 
router.put("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, updateWorkout); 
router.delete("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, deleteWorkout); 

export default router;