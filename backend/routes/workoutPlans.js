import express from "express";
import { postWorkoutPlan, getWorkoutPlans, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan  } from "../controllers/workoutPlan.js";
import authToken from "../middlewares/authenticateToken.js";
import workoutsAllowed from "../middlewares/workoutsAllowed.js";

const router = express.Router()

router.post("/", authToken, postWorkoutPlan); //DONE
router.get("/", authToken, getWorkoutPlans); //DONE
router.get("/:workout_planId", authToken, workoutsAllowed, getWorkoutPlan) //DONE
router.put("/:workout_planId", authToken, workoutsAllowed, updateWorkoutPlan); //DONE
router.delete("/:workout_planId", authToken, workoutsAllowed, deleteWorkoutPlan); //DONE

export default router;