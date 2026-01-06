import express from "express";
import dotenv from "dotenv";
dotenv.config();
import apiRouter from "./routes";
const PORT  = process.env.PORT || 3000;
import cors from "cors";
import { connectDB } from "./config/database";
import { logger } from "./v1/middlewares/logger";
import { globalErrorHandler } from "./v1/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(`/${process.env.CONTEXT_PATH}`, apiRouter);
connectDB();

// app.use(logger);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
