import { db } from "../connect.js";

const exercisesAllowed = async (req, res, next) => {
    const workoutId = req.params.workoutId;
    const userId = req.userId;
    let workoutPlanId;

    const q = "SELECT workout_planId FROM workouts WHERE id = ?";

    db.query(q, [workoutId], (error, data) => {
        if(error) return res.status(500).json(error);
        if(!data.length){
            return res.status(403).json("Forbidden");
        }else{
            workoutPlanId = data[0].workout_planId;
        
            const workoutPlanQuerry = "SELECT userId FROM workout_plans WHERE id = ?";
    
            db.query(workoutPlanQuerry, [workoutPlanId], (error, data) => {
                if(error) return res.status(500).json(error);
                let workoutPlan = data[0];
                if(workoutPlan.userId !== userId){
                    return res.status(403).json("Forbidden");
                }else{
                    next();
                }
            })
        }
    })
}

export default exercisesAllowed;