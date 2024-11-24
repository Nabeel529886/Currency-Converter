import { Container } from "react-bootstrap";
import Converter from "./component/Converter";

const App = () => {
  return (
    <Container className="mt-5" fluid={"sm"}>
      <Converter />
    </Container>
  );
};

export default App;
