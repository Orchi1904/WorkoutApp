import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const postWorkoutPlan = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "INSERT INTO workout_plans (`name`, `userId`) VALUES (?)";

        const values = [req.body.name, user.id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Der Trainingsplan wurde erfolgreich erstellt!");
        })
    })
}

export const getWorkoutPlans = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    //Use token to get id of logged in user
    jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "SELECT * FROM workout_plans WHERE userId = ?";

        db.query(q, [user.id], (err, workoutPlans) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(workoutPlans);
        })
    })
}

export const updateWorkoutPlan = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    //Use token to get id of logged in user
    jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "UPDATE workout_plans SET `name` = ? WHERE id = ?";

        db.query(q,
            [req.body.name, req.body.id],
            (err, user) => {
                if (err) res.status(500).json(err);
                return res.json("Trainingsplan erfolgreich geändert!");
        })
    })
}

export const deleteWorkoutPlan = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    //Use token to get id of logged in user
    jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "DELETE FROM workout_plans WHERE id = ?";

        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Trainingsplan erfolgreich gelöscht!");
        })
    })
}