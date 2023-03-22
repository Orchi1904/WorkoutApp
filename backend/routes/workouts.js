import express from "express";
import { getWorkouts, postWorkout } from "../controllers/workout.js";

const router = express.Router()

router.get("/", getWorkouts);
router.post("/", postWorkout);

export default router;