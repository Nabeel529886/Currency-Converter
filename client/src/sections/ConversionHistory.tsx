import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import useConversionHistory from "../hooks/useConversionHistory";
import { Button } from "react-bootstrap";

const ConversionHistory = () => {
  const { conversionHistory, deleteHistoryItem } = useConversionHistory();

  return (
    <Card>
      <Card.Body>
        <Card.Title>Conversion History</Card.Title>
        {conversionHistory.length === 0 ? (
          <Card.Text className="fs-5 text-muted">
            No history available
          </Card.Text>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conversionHistory.map((record) => (
                <tr key={record.id}>
                  <td style={{ whiteSpace: "nowrap", width: "auto" }}>
                    {record.date.toLocaleString()}
                  </td>
                  <td>{record.fromCurrency}</td>
                  <td>{record.toCurrency}</td>
                  <td>{record.amount}</td>
                  <td style={{ whiteSpace: "nowrap", width: "auto" }}>
                    {record.result}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="danger"
                      onClick={() => deleteHistoryItem(record.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ConversionHistory;
