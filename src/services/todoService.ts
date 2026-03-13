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