import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";
import authToken from "../middlewares/authenticateToken.js";

const router = express.Router()

router.get("/find/:userId", authToken, getUser);
router.put("/", authToken, updateUser);
router.delete("/", authToken, deleteUser);

export default router;