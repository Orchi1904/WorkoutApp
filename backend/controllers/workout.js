import { db } from "../connect.js";

export const postWorkout = (req, res) => {
    const q = "INSERT INTO workouts (`name`, `weekday`, `duration`, workout_planId) VALUES (?)";

    const values = [req.body.name, req.body.weekday, req.body.duration, req.body.workout_planId];

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Training erfolgreich angelegt!");
    })
}

export const getWorkouts = (req, res) => {
    const q = "SELECT * from workouts WHERE workout_planId = ?";

    //Query because planId will be given in URL
    db.query(q, req.query.workout_planId, (err, workouts) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(workouts);
    })
}