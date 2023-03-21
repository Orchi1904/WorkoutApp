import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        //Check if there is an error or the user already exists
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("Der Benutzer existiert bereits!");

        //Hash password of new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`) VALUE (?)";

        const values = [req.body.username, req.body.email, hashedPassword];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Der Nutzer wurde erfolgreich angelegt!");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Diesen Nutzer gibt es nicht!");

        const passwordIsRight = bcrypt.compareSync(req.body.password, data[0].password);

        if (!passwordIsRight) {
            return res.status(400).json("Das Passwort ist nicht korrekt!");
        }

        //Only return the remainingData without the password as a cookie
        const token = jwt.sign({ id: data[0].id }, "verysecretkey");
        const { password, ...remainingData } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(remainingData)
    })
}

export const logout = (req, res) => {
    //Delete Cookie on logout
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none", //Because backend port is different to frontend port
    }).status(200).json("Nutzer erfolgreich abgemeldet!");
}