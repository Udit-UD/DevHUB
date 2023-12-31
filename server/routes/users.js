import express from "express";
import { getUser, getFriends, addRemoveFriend, searchFriends } from "../Controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/searchuser", verifyToken, searchFriends);
router.get("/:id/friends", verifyToken, getFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;