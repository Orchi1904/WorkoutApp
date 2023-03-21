import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getWorkoutPlans = (req, res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    //Use token to get id of logged in user
    jwt.verify(token, "verysecretkey", (err, user) => {
        if(err) return res.status(403).json("Der Token ist nicht gültig!");
        
        const q = "SELECT * FROM workout_plan WHERE userId = ?";
        
        db.query(q, [user.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}