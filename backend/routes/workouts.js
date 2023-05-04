import express from "express";
import { postWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from "../controllers/workout.js";
import authToken from "../middlewares/authenticateToken.js";
import workoutsAllowed from "../middlewares/workoutsAllowed.js";

const router = express.Router()

router.post("/", authToken, postWorkout);
router.get("/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkouts);
router.get("/:workoutId/workoutPlans/:workout_planId", authToken, workoutsAllowed, getWorkout)
router.put("/", authToken, updateWorkout);
router.delete("/:id", authToken, deleteWorkout);

export default router;