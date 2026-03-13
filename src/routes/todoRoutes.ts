import { Router } from "express";
import { createTodoController, deleteTodoController, getTodosController, updateTodoController } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/todos", authMiddleware, createTodoController);
router.get("/todos", authMiddleware, getTodosController);
router.patch("/todos/:id", authMiddleware, updateTodoController);
router.delete("/todos/:id", authMiddleware, deleteTodoController);

export default router;