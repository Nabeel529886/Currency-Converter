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

    if (data.errors) {
      const error = Object.values(data.errors)[0] as string[];

      res.status(400).json({
        status: 400,
        message: error[0],
      });

      return;
    }

    const conversionRate = Object.values(data.data) as number[];

    res.status(200).json({
      status: 200,
      message: "Converted Successfully",
      data: {
        rate: conversionRate[0],
      },
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
