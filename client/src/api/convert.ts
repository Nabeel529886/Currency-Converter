import { ApiResponse, ConversionRate } from "../types";
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
