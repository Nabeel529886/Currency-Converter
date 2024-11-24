import { Request, Response, Router } from "express";
import { getCurrencyApiRoute } from "../utils";

const conversionRouter = Router();

const apiRoute = getCurrencyApiRoute("latest");

conversionRouter.get("/", async (req: Request, res: Response) => {
  const base = req.query.base as string;
  const target = req.query.target as string;

  try {
    const response = await fetch(
      `${apiRoute}&base_currency=${base}&currencies=${target}`
    );

    const data = await response.json();

    res.status(200).json({
      status: 200,
      message: "Converted Successfully",
      data: data,
    });

    return;
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
});

export default conversionRouter;
