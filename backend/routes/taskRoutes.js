import express from "express";
import {verifyToken} from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;