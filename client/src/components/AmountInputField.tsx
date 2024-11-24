import Form from "react-bootstrap/Form";

interface AmountInputFieldProps {
  amount: string;
  setAmount: (amount: string) => void;
}

const AmountInputField = ({ amount, setAmount }: AmountInputFieldProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Amount</Form.Label>
      <Form.Control
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </Form.Group>
  );
};

export default AmountInputField;
