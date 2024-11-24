import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { fetchConversionRate } from "../api/convert";
// import { Spinner } from "react-bootstrap";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
];

const Converter = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const rateObj = await fetchConversionRate(fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * rateObj.rate;
    const resultString = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
    setResult(resultString);
    setLoading(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-4">Currency Converter</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>From Currency</Form.Label>
            <Form.Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>To Currency</Form.Label>
            <Form.Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleConvert}>
            Convert
          </Button>
        </Form>
        {loading && <Spinner animation="border" className="mt-3" />}
        {!loading && result && (
          <Card.Text className="mt-3 fs-4">{result}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Converter;
