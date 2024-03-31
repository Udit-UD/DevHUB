import express from "express";
import {verifyToken} from "../middleware/auth.js";
import { accessChat } from "../Controllers/chat.js";

const router = express.Router();

// READ
router.post("/", verifyToken, accessChat);
// router.get("/searchuser", verifyToken, searchFriends);
// router.get("/:id/friends", verifyToken, getFriends);

// UPDATE
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;