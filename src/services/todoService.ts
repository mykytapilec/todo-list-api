import prisma from "../config/prisma";

interface TodoData {
  title: string;
  description?: string;
}

export const createTodo = async (data: TodoData, userId: number) => {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      userId,
      completed: false,
    },
  });
};

export const getTodos = async (
  userId: number,
  page: number,
  limit: number,
  completed?: boolean,
  sortBy: "createdAt" | "title" = "createdAt",
  order: "asc" | "desc" = "desc"
) => {
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (completed !== undefined) {
    where.completed = completed;
  }

  const [data, total] = await Promise.all([
    prisma.todo.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
    }),
    prisma.todo.count({ where }),
  ]);

  return { data, page, limit, total };
};

interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const updateTodo = async (todoId: number, userId: number, data: UpdateTodoData) => {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo || todo.userId !== userId) {
    return null;
  }

  return prisma.todo.update({
    where: { id: todoId },
    data,
  });
};

export const deleteTodo = async (todoId: number, userId: number) => {
  const todo = await prisma.todo.findUnique({ where: { id: todoId } });

  if (!todo || todo.userId !== userId) {
    return false;
  }

  await prisma.todo.delete({ where: { id: todoId } });
  return true;
};