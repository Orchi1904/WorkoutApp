import express from "express";
import { postWorkout, getWorkouts, updateWorkout, deleteWorkout } from "../controllers/workout.js";
import authToken from "../middlewares/authenticateToken.js";

const router = express.Router()

router.post("/", authToken, postWorkout);
router.get("/:workout_planId", authToken, getWorkouts);
router.put("/", authToken, updateWorkout);
router.delete("/:id", authToken, deleteWorkout);

export default router;