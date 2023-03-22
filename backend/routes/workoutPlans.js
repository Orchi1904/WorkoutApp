import express from "express";
import { getWorkoutPlans, postWorkoutPlan } from "../controllers/workoutPlan.js";

const router = express.Router()

router.get("/", getWorkoutPlans);
router.post("/", postWorkoutPlan);

export default router;