import { Request, Response } from "express";
import { createTodo, getTodos } from "../services/todoService";

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
    const completedQuery = req.query.completed as string;
    const completed = completedQuery === "true" ? true : completedQuery === "false" ? false : undefined;

    const todos = await getTodos(userId, { page, limit, completed });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};