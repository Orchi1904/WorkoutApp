import express from "express";
import { getWorkoutPlans } from "../controllers/workoutPlan.js";

const router = express.Router()

router.get("/", getWorkoutPlans);

export default router;