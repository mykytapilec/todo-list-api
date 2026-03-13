import prisma from "../../config/prisma";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../todoService";

jest.mock("../../config/prisma", () => ({
  todo: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("todoService", () => {
  const mockTodo = {
    id: 1,
    title: "Test",
    description: "Desc",
    completed: false,
    userId: 1,
    createdAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("createTodo should create a todo", async () => {
    (prisma.todo.create as jest.Mock).mockResolvedValue(mockTodo);

    const result = await createTodo({ title: "Test", description: "Desc" }, 1);
    expect(result).toEqual(mockTodo);
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: { title: "Test", description: "Desc", userId: 1, completed: false },
    });
  });

  it("getTodos should return paginated todos", async () => {
    (prisma.todo.findMany as jest.Mock).mockResolvedValue([mockTodo]);
    (prisma.todo.count as jest.Mock).mockResolvedValue(1);

    const result = await getTodos(1, 1, 10);
    expect(result).toEqual({
      data: [mockTodo],
      page: 1,
      limit: 10,
      total: 1,
    });
  });

  it("updateTodo should return updated todo", async () => {
    (prisma.todo.findFirst as jest.Mock).mockResolvedValue(mockTodo);
    (prisma.todo.update as jest.Mock).mockResolvedValue({ ...mockTodo, title: "Updated" });

    const result = await updateTodo(1, 1, { title: "Updated" });
    expect(result).not.toBeNull();
    expect(result!.title).toBe("Updated");
  });

  it("updateTodo should return null if todo not found", async () => {
    (prisma.todo.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await updateTodo(99, 1, { title: "Updated" });
    expect(result).toBeNull();
  });

  it("deleteTodo should return true if deleted", async () => {
    (prisma.todo.findFirst as jest.Mock).mockResolvedValue(mockTodo);
    (prisma.todo.delete as jest.Mock).mockResolvedValue(mockTodo);

    const result = await deleteTodo(1, 1);
    expect(result).toBe(true);
  });

  it("deleteTodo should return false if not found", async () => {
    (prisma.todo.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await deleteTodo(99, 1);
    expect(result).toBe(false);
  });
});