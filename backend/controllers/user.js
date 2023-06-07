import { db } from "../connect.js";

/*Since my website offers no way to get, update or delete users, these functions are not used
in my application but I still decided to let them rest here ;)*/

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, userId, (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user.length) return res.status(404).json({ msg: "Nutzer existiert nicht!" });
        const { password, ...remainingData } = user[0];
        return res.status(200).json(remainingData);
    })
}

export const updateUser = (req, res) => {
    const q = "UPDATE users SET `username` = ? WHERE id = ?";

    db.query(q,
        [req.body.username, req.userId],
        (err, user) => {
            if (err) res.status(500).json(err);
            return res.status(200).json("Nutzer erfolgreich geändert!");
        })
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE id = ?";

    db.query(q, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Nutzer erfolgreich gelöscht!");
    })
}