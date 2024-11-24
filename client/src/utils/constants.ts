const isProduction = import.meta.env.PROD;

export const BASE_API_URL = isProduction
  ? "https://currency-converter-sable-xi.vercel.app/api"
  : "http://localhost:3000/api";
