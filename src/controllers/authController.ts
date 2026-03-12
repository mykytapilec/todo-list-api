import { Request, Response } from "express";
import { registerUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {

    const { name, email, password } = req.body;

    const result = await registerUser({ name, email, password });

    res.status(201).json(result);

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    });

  }
};