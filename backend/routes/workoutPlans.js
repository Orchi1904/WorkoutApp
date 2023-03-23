import express from "express";
import { postWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan  } from "../controllers/workoutPlan.js";

const router = express.Router()

router.post("/", postWorkoutPlan);
router.get("/", getWorkoutPlans);
router.put("/", updateWorkoutPlan);
router.delete("/", deleteWorkoutPlan);

export default router;