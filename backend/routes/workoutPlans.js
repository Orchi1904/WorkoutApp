import express from "express";
import { postWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan  } from "../controllers/workoutPlan.js";
import authToken from "../middlewares/authenticateToken.js";

const router = express.Router()

router.post("/", authToken, postWorkoutPlan);
router.get("/", authToken, getWorkoutPlans);
router.put("/", authToken, updateWorkoutPlan);
router.delete("/:id", authToken, deleteWorkoutPlan);

export default router;