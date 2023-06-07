import { db } from "../connect.js";

export const postWorkout = (req, res) => {
    const q = "INSERT INTO workouts (`name`, `weekday`, `duration`, workout_planId) VALUES (?)";

    const { name, weekday, duration } = req.body;

    const values = [name, weekday, duration, req.params.workout_planId];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Training erfolgreich angelegt!");
    })
}

export const getWorkouts = (req, res) => {
    const q = "SELECT * from workouts WHERE workout_planId = ?";

    db.query(q, req.params.workout_planId, (err, workouts) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(workouts);
    })
}

export const getWorkout = (req, res) => {
    const q = "SELECT * from workouts WHERE id = ?";

    db.query(q, req.params.workoutId, (err, workouts) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(workouts);
    })
}

export const updateWorkout = (req, res) => {
    const q = "UPDATE workouts SET `name`= ?, `weekday` = ?, `duration` = ? WHERE id = ?"

    const { name, weekday, duration } = req.body;

    db.query(q,
        [name, weekday, duration, req.params.workoutId],
        (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Training erfolgreich verändert!");
        })
}

export const deleteWorkout = (req, res) => {
    const q = "DELETE FROM workouts WHERE id = ?";

    db.query(q, [req.params.workoutId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Training erfolgreich gelöscht!");
    })
}