import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { fetchConversionRate, fetchCurrencies } from "../api/convert";
import { Currencies } from "../types";
import AmountInputField from "../components/AmountInputField";
import CurrencySelect from "../components/CurrencySelect";
import { toast } from "react-toastify";

const Converter = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [converting, setIsConverting] = useState(false);
  const [currencies, setCurrencies] = useState<Currencies[]>([]);

  const handleConvert = async () => {
    if (amount === "") {
      toast.warn("Please enter an amount");
      return;
    }

    setIsConverting(true);
    const rateObj = await fetchConversionRate(fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * rateObj.rate;
    const resultString = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
    setResult(resultString);
    setIsConverting(false);
  };

  useEffect(() => {
    (async () => {
      const currencies = await fetchCurrencies();
      setCurrencies(currencies);
      setFromCurrency(currencies[0].code);
      setToCurrency(currencies[1].code);
    })();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-4">Currency Converter</Card.Title>
        <Form>
          <AmountInputField amount={amount} setAmount={setAmount} />
          <CurrencySelect
            value={fromCurrency}
            setFromCurrency={setFromCurrency}
            currencies={currencies}
            title="From Currency"
          />
          <CurrencySelect
            value={toCurrency}
            setFromCurrency={setToCurrency}
            currencies={currencies}
            title="To Currency"
          />
          <Button variant="primary" onClick={handleConvert}>
            Convert
          </Button>
        </Form>
        {converting && <Spinner animation="border" className="mt-3" />}
        {!converting && result && (
          <Card.Text className="mt-3 fs-4">{result}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Converter;
