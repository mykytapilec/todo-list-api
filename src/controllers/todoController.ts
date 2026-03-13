import { Request, Response } from "express";
import { createTodo } from "../services/todoService";

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