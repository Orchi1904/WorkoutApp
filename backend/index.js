import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import workoutRoutes from "./routes/workouts.js";
import workoutPlanRoutes from "./routes/workoutPlans.js";
import exerciseRoutes from "./routes/exercises.js";
import cookieParser from "cookie-parser";

app.listen(8800, ()=>{
    console.log("Database working!")
})

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/workoutPlans", workoutPlanRoutes);
app.use("/api/exercises", exerciseRoutes);