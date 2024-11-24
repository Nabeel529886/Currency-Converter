export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ConversionRate {
  rate: number;
}

export interface Currencies {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
}

export interface ConversionRecord {
  id: number;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  result: string;
  date: Date;
}
