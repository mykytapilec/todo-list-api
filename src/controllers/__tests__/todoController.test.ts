import { Request, Response } from "express";
import * as todoService from "../../services/todoService";
import {
  createTodoController,
  getTodosController,
  updateTodoController,
  deleteTodoController,
} from "../todoController";

interface AuthRequest extends Request {
  user?: { id: number };
}

describe("Todo Controller", () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {}, user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createTodoController", () => {
    it("should create a todo and return 201", async () => {
      const todo = {
        id: 1,
        title: "Test",
        description: "Desc",
        completed: false,
        userId: 1,
        createdAt: new Date(),
      };
      jest.spyOn(todoService, "createTodo").mockResolvedValue(todo);

      req.body = { title: "Test", description: "Desc" };
      await createTodoController(req as AuthRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(todo);
    });

    it("should return 400 if title is missing", async () => {
      req.body = { description: "Desc" };
      await createTodoController(req as AuthRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Title is required" });
    });
  });

  describe("getTodosController", () => {
    it("should return todos", async () => {
      const todos = { data: [], page: 1, limit: 10, total: 0 };
      jest.spyOn(todoService, "getTodos").mockResolvedValue(todos);

      await getTodosController(req as AuthRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(todos);
    });
  });

  describe("updateTodoController", () => {
    it("should update a todo", async () => {
      const updatedTodo = {
        id: 1,
        title: "Updated",
        description: "Desc",
        completed: true,
        userId: 1,
        createdAt: new Date(),
      };
      jest.spyOn(todoService, "updateTodo").mockResolvedValue(updatedTodo);

      req.params = { id: "1" };
      req.body = { title: "Updated", description: "Desc", completed: true };
      await updateTodoController(req as AuthRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(updatedTodo);
    });

    it("should return 403 if todo not found", async () => {
      jest.spyOn(todoService, "updateTodo").mockResolvedValue(null);

      req.params = { id: "1" };
      req.body = { title: "Updated" };
      await updateTodoController(req as AuthRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });
  });

  describe("deleteTodoController", () => {
    it("should delete a todo", async () => {
      jest.spyOn(todoService, "deleteTodo").mockResolvedValue(true);

      req.params = { id: "1" };
      await deleteTodoController(req as AuthRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 403 if todo not found", async () => {
      jest.spyOn(todoService, "deleteTodo").mockResolvedValue(false);

      req.params = { id: "1" };
      await deleteTodoController(req as AuthRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });
  });
});