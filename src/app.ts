import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import httpStatus from "http-status";
import router from "./app/routers";

const app = express();

app.use(cors());

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

// if API not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found !",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found !",
      },
    ],
  });
  next();
});

export default app;
