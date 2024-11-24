import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("Server is running...");
});

app.use("/api", appRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
