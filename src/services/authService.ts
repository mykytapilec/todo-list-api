import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterInput) => {

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken(user.id);

  return { token };
};


export const loginUser = async (email: string, password: string) => {

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return { token };
};