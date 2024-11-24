import { Router } from "express";
import conversionRouter from "./conversion.router";
import currenciesRouter from "./currencies.router";

const appRouter = Router();

appRouter.use("/convert", conversionRouter);
appRouter.use("/currencies", currenciesRouter);

export default appRouter;
