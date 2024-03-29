import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import workoutRoutes from "./routes/workouts.js";
import workoutPlanRoutes from "./routes/workoutPlans.js";
import exerciseRoutes from "./routes/exercises.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.listen(8800, () => {
    console.log("Database working!")
})

//Needed to send cookies
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", //allow this URL
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/workoutPlans", workoutPlanRoutes);
app.use("/api/exercises", exerciseRoutes);