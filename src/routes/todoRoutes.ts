import { Router } from "express";
import {
  createTodoController,
  getTodosController,
  updateTodoController,
  deleteTodoController
} from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/todos", createTodoController);
router.get("/todos", getTodosController);
router.patch("/todos/:id", updateTodoController);
router.delete("/todos/:id", deleteTodoController);

export default router;