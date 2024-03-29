import express from "express";
import { postWorkoutPlan, getWorkoutPlans, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } from "../controllers/workoutPlan.js";
import authToken from "../middlewares/authenticateToken.js";
import workoutsAllowed from "../middlewares/workoutsAllowed.js";

const router = express.Router()

router.post("/", authToken, postWorkoutPlan); 
router.get("/", authToken, getWorkoutPlans); 
router.get("/:workout_planId", authToken, workoutsAllowed, getWorkoutPlan) 
router.put("/:workout_planId", authToken, workoutsAllowed, updateWorkoutPlan); 
router.delete("/:workout_planId", authToken, workoutsAllowed, deleteWorkoutPlan); 

export default router;