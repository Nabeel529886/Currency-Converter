import { Container } from "react-bootstrap";
import EventEmitterProvider from "./components/EventEmitterProvider";
import ConversionHistory from "./sections/ConversionHistory";
import Converter from "./sections/Converter";

const App = () => {
  return (
    <EventEmitterProvider>
      <Container className="mt-5" fluid={"sm"}>
        <Converter />
        <ConversionHistory />
      </Container>
    </EventEmitterProvider>
  );
};

export default App;
