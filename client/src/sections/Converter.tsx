import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import AmountInputField from "../components/AmountInputField";
import CurrencySelect from "../components/CurrencySelect";
import useConverter from "../hooks/useConverter";

const Converter = () => {
  const {
    converting,
    currencies,
    handleConvert,
    result,
    amount,
    fromCurrency,
    setAmount,
    setFromCurrency,
    setToCurrency,
    toCurrency,
  } = useConverter();

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
          <Button
            variant="primary"
            onClick={handleConvert}
            disabled={converting}
          >
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
