import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    const {username, email, password, repPassword} = req.body;

    db.query(q, [username, email], (err, data) => {
        //Check if there is an error or the user already exists
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(422).json({msg: "Der Benutzer existiert bereits!"});

        //Check if password and repPassword are the same
        if(password !== repPassword)
        return res.status(500).json({msg: "Die Passwörter stimmen nicht überein!"});

        //Hash password of new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";

        const values = [username, email, hashedPassword];

        const accessToken = jwt.sign({ username }, "verysecretkey");

        /*res.json({
            accessToken,
        });*/

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({accessToken, msg: "Der Nutzer wurde erfolgreich angelegt!"});
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({msg: "Benutzername oder Passwort falsch!"});

        const passwordIsRight = bcrypt.compareSync(req.body.password, data[0].password);

        if (!passwordIsRight) {
            return res.status(400).json({msg: "Benutzername oder Passwort falsch!"});
        }

        //Only return the remainingData without the password as a cookie
        const accessToken = jwt.sign({ id: data[0].id, username: req.body.username }, "verysecretkey");
        //const { password, ...remainingData } = data[0];

        /*res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(remainingData)*/

        res.json({
            accessToken,
        });
    });
}

/*export const logout = (req, res) => {
    //Delete Cookie on logout
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none", //Because backend port is different to frontend port
    }).status(200).json("Nutzer erfolgreich abgemeldet!");
    console.log("HI");
}*/