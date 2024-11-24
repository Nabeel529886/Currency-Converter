import dotenv from "dotenv";

dotenv.config();

export const getCurrencyApiRoute = (route: "latest" | "currencies") => {
  return `https://api.freecurrencyapi.com/v1/${route}?apikey=${process.env.CURRENCY_API_KEY}`;
};
