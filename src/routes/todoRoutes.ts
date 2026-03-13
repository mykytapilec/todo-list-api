import { Router } from "express";
import { createTodoController, getTodosController } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/todos", authMiddleware, createTodoController);
router.get("/todos", authMiddleware, getTodosController);

export default router;