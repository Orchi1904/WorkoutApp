import express from "express";
import { postWorkoutPlan, getWorkoutPlans, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan  } from "../controllers/workoutPlan.js";
import authToken from "../middlewares/authenticateToken.js";

const router = express.Router()

router.post("/", authToken, postWorkoutPlan);
router.get("/", authToken, getWorkoutPlans);
router.get("/:workout_planId", authToken, getWorkoutPlan)
router.put("/", authToken, updateWorkoutPlan);
router.delete("/:workout_planId", authToken, deleteWorkoutPlan);

export default router;