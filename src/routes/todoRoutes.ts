import { Router } from "express";
import { createTodoController, getTodosController, updateTodoController } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/todos", authMiddleware, createTodoController);
router.get("/todos", authMiddleware, getTodosController);
router.patch("/todos/:id", authMiddleware, updateTodoController);

export default router;