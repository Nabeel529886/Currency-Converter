import { Request, Response, Router } from "express";
import { getCurrencyApiRoute } from "../utils";

const currenciesRouter = Router();

currenciesRouter.get("/", async (_: Request, res: Response) => {
  const response = await fetch(getCurrencyApiRoute("currencies"));

  const data = await response.json();

  res.status(200).json({
    status: 200,
    message: "Currencies Fetched Successfully",
    data: data,
  });
});

export default currenciesRouter;
