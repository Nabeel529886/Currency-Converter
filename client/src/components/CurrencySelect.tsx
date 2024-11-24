import Form from "react-bootstrap/Form";
import { Currencies } from "../types";

interface CurrencySelectProps {
  value: string;
  setFromCurrency: (value: string) => void;
  currencies: Currencies[];
  title: string;
}

const CurrencySelect = ({
  value,
  currencies,
  setFromCurrency,
  title,
}: CurrencySelectProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{title}</Form.Label>
      <Form.Select
        value={value}
        disabled={currencies.length === 0}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option
            key={currency.code}
            value={currency.code}
            disabled={currency.code === "ILS"}
          >
            {currency.code} - ({currency.name})
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CurrencySelect;
