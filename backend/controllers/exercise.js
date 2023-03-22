import { db } from "../connect.js"

export const postExercise = (req, res) => {
    const q = "INSERT INTO exercises (`name`, `numberOfSets`, `repsPerSet`, `weight`, `workoutId`) VALUES (?)";

    const values = [req.body.name, req.body.numberOfSets, req.body.repsPerSet, req.body.weight, req.body.workoutId];

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Übung erfolgreich angelegt!");
    })
}

export const getExercises = (req, res) => {
    const q = "SELECT * FROM exercises WHERE workoutId = ?";

    db.query(q, req.query.workoutId, (err, exercises) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(exercises);
    });
}