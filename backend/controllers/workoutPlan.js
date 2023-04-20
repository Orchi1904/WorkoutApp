import { db } from "../connect.js";

export const postWorkoutPlan = (req, res) => {
    const q = "INSERT INTO workout_plans (`name`, `userId`) VALUES (?)";

    const values = [req.body.name, req.userId];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Der Trainingsplan wurde erfolgreich erstellt!");
    })
}

export const getWorkoutPlans = (req, res) => {
    const q = "SELECT * FROM workout_plans WHERE userId = ?";

    db.query(q, [req.userId], (err, workoutPlans) => {
        return err ? res.status(500).json(err) : res.status(200).json(workoutPlans);
    })
}

export const updateWorkoutPlan = (req, res) => {
    const q = "UPDATE workout_plans SET `name` = ? WHERE id = ?";

    db.query(q,
        [req.body.name, req.body.id],
        (err, user) => {
            if (err) res.status(500).json(err);
            return res.json("Trainingsplan erfolgreich geändert!");
        })
}

export const deleteWorkoutPlan = (req, res) => {
    const q = "DELETE FROM workout_plans WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Trainingsplan erfolgreich gelöscht!");
    })
}