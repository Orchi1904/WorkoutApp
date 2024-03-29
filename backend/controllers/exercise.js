import { db } from "../connect.js"

export const postExercise = (req, res) => {
    const q = "INSERT INTO exercises (`name`, `numberOfSets`, `repsPerSet`, `weight`, `ytLink`, `description`, `workoutId`) VALUES (?)";

    const ytLink = req.body.ytLink;
    const ytRegex = /(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/;
    const match = ytLink.match(ytRegex);
    let ytEmbeddedLink = "";

    if (match) {
        ytEmbeddedLink = `https://www.youtube.com/embed/${match[1]}`;
    } else {
        if (ytLink !== "") {
            return res.status(400).json("Kein gültiger YouTube-Link!");
        }
    }

    const values = [req.body.name, req.body.numberOfSets, req.body.repsPerSet, req.body.weight,
        ytEmbeddedLink, req.body.description, req.params.workoutId];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Übung erfolgreich angelegt!");
    })
}

export const getExercises = (req, res) => {
    const q = "SELECT * FROM exercises WHERE workoutId = ?";

    db.query(q, req.params.workoutId, (err, exercises) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(exercises);
    });
}

export const updateExercise = (req, res) => {
    const q = "UPDATE exercises SET `name`= ?, `numberOfSets` = ?, `repsPerSet` = ?, `weight` = ?, `ytLink` = ?, `description` = ? WHERE id = ?";

    const ytLink = req.body.ytLink;
    const ytRegex = /(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/;
    const match = ytLink.match(ytRegex);
    let ytEmbeddedLink = "";

    if (match) {
        ytEmbeddedLink = `https://www.youtube.com/embed/${match[1]}`;
    } else {
        if (ytLink !== "") {
            return res.status(400).json("Kein gültiger YouTube-Link!");
        }
    }

    db.query(q,
        [req.body.name, req.body.numberOfSets, req.body.repsPerSet, req.body.weight, ytEmbeddedLink, req.body.description, req.params.exerciseId],
        (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Übung erfolgreich verändert!");
        })
}

export const deleteExercise = (req, res) => {
    const q = "DELETE FROM exercises WHERE id = ?";

    db.query(q, [req.params.exerciseId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Übung erfolgreich gelöscht!");
    })
}