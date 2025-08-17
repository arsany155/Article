import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Config/db";

import userRouter from "./Routes/userRoute";
import articleRouter from "./Routes/articleRoute";
import tagRouter from "./Routes/tagRoute";
import { NotFound, errorHandler } from "./Middlewares/error";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080", // Replace with your frontend app's domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and credentials for cross-origin requests
    optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
  })
);

connectDB();

if (process.env.NODE_ENV === "development") {
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/tag", tagRouter);

// Health check
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use(NotFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
