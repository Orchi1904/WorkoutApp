import { db } from "../connect.js";

const workoutsAllowed = async (req, res, next) => {
    const workoutPlanId = req.params.workout_planId;
    const userId = req.userId;

    const q = "SELECT userId FROM workout_plans WHERE id = ?";

    db.query(q, [workoutPlanId], (error, data) => {
        if (error) return res.status(500).json(error);

        const workoutPlan = data[0];

        if (workoutPlan?.userId !== userId) {
            return res.status(403).json("Forbidden");
        } else {
            next();
        }
    })
}

export default workoutsAllowed;