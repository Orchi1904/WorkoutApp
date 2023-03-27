import express from "express";
import { postWorkout, getWorkouts, updateWorkout, deleteWorkout } from "../controllers/workout.js";

const router = express.Router()

router.post("/", postWorkout);
router.get("/:workout_planId", getWorkouts);
router.put("/", updateWorkout);
router.delete("/", deleteWorkout);

export default router;