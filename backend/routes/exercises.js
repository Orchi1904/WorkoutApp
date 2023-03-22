import express from "express";
import { getExercises, postExercise } from "../controllers/exercise.js";

const router = express.Router()

router.get("/", getExercises);
router.post("/", postExercise);

export default router;