import { ApiResponse, ConversionRate, Currencies } from "../types";
import { BASE_API_URL } from "../utils/constants";

export const fetchConversionRate = async (
  from: string,
  to: string
): Promise<ConversionRate> => {
  const response = await fetch(
    `${BASE_API_URL}/convert?base=${from}&target=${to}`
  );

  const data: ApiResponse<ConversionRate> = await response.json();

  return data.data;
};

export const fetchCurrencies = async (): Promise<Currencies[]> => {
  const response = await fetch(`${BASE_API_URL}/currencies`);

  const data: ApiResponse<Currencies[]> = await response.json();

  return data.data;
};
