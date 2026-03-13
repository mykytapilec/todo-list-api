import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";


import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Todo List API is running" });
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: (req as any).user
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});