import { Request, Response, Router } from "express";
import { getCurrencyApiRoute } from "../utils";
import { Currencies } from "../types";

const currenciesRouter = Router();

currenciesRouter.get("/", async (_: Request, res: Response) => {
  const response = await fetch(getCurrencyApiRoute("currencies"));

  const data = await response.json();

  if (!data.data) {
    res.status(400).json({
      status: 400,
      message: "Failed to fetch currencies",
    });

    return;
  }

  const currencies: Currencies[] = Object.values(data.data);

  res.status(200).json({
    status: 200,
    message: "Currencies Fetched Successfully",
    data: currencies,
  });
});

export default currenciesRouter;
