import { Request, Response } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/todoService";

export const createTodoController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const userId = (req as any).user.id;

    const todo = await createTodo({ title, description }, userId);

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodosController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    let completed: boolean | undefined = undefined;
    if (req.query.completed !== undefined) {
      completed = req.query.completed === "true";
    }

    let sortBy: "createdAt" | "title" = "createdAt";
    if (req.query.sortBy === "title") sortBy = "title";
    if (req.query.sortBy === "createdAt") sortBy = "createdAt";

    const order = (req.query.order as string) === "asc" ? "asc" : "desc";

    const todos = await getTodos(userId, page, limit, completed, sortBy, order);

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id as string);
    const userId = (req as any).user.id;
    const { title, description, completed } = req.body;

    const updatedTodo = await updateTodo(todoId, userId, { title, description, completed });

    if (!updatedTodo) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id as string);
    const userId = (req as any).user.id;

    const deleted = await deleteTodo(todoId, userId);

    if (!deleted) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};