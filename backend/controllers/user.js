import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, userId, (err, user) => {
        if (err) res.status(500).json(err);
        const { password, ...remainingData } = user[0];
        return res.json(remainingData);
    })
}

//Eventuell ungenutzt
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");

    jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "UPDATE users SET `avatar` = ? WHERE id = ?";

        db.query(q,
            [req.body.avatar, user.id],
            (err, user) => {
                if (err) res.status(500).json(err);
                return res.json("Nutzer erfolgreich geändert!");
            })
    });
}

//Eventuell ungenutzt
export const deleteUser = (req, res) => {
    /*const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Nutzer ist nicht angemeldet!");*/

    const q = "DELETE FROM users WHERE id = ?";

        db.query(q, [req.body.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Nutzer erfolgreich gelöscht!");
        })

    /*jwt.verify(token, "verysecretkey", (err, user) => {
        if (err) return res.status(403).json("Der Token ist nicht gültig!");

        const q = "DELETE FROM users WHERE id = ?";

        db.query(q, [user.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Nutzer erfolgreich gelöscht!");
        })
    });*/
}