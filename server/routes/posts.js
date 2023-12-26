import express from "express";
import {getFeedPosts, getUserPosts, likePost, commentPost, getComments} from "../Controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id/getComments", verifyToken, getComments);

// WRITE
router.post("/:id/comment", verifyToken, commentPost);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);


export default router;