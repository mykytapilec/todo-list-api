import { Router } from "express";
import { createTodoController } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/todos", authMiddleware, createTodoController);

export default router;