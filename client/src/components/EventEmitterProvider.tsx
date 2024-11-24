import { createContext, useContext } from "react";
import { EventEmitter } from "events";

const EventEmitterContext = createContext<{ eventEmitter: EventEmitter }>({
  eventEmitter: new EventEmitter(),
});

export const useEventEmitter = () => useContext(EventEmitterContext);

const EventEmitterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EventEmitterContext.Provider value={{ eventEmitter: new EventEmitter() }}>
      {children}
    </EventEmitterContext.Provider>
  );
};

export default EventEmitterProvider;
