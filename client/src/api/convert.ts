export const fetchConversionRate = async (from: string, to: string) => {
  const response = await fetch(
    `http://localhost:3000/api/convert?base=${from}&target=${to}`
  );

  const data = await response.json();

  return data.data;
};
