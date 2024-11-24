import { useCallback, useEffect, useState } from "react";
import { useEventEmitter } from "../components/EventEmitterProvider";
import { ConversionRecord } from "../types";
import useIndexedDB from "./useIndexedDb";
import { INDEXED_DB } from "../utils/constants";

const useConversionHistory = () => {
  const { eventEmitter } = useEventEmitter();
  const { getAllItems, deleteItem } = useIndexedDB<ConversionRecord>(
    INDEXED_DB.dbName,
    INDEXED_DB.storeName
  );
  const [conversionHistory, setConversionHistory] = useState<
    ConversionRecord[]
  >([]);

  const getHistory = useCallback(async () => {
    const conversionHistory = await getAllItems();
    const sortedHistory = conversionHistory.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setConversionHistory(sortedHistory);
  }, [getAllItems]);

  const deleteHistoryItem = async (id: IDBValidKey) => {
    await deleteItem(id);
    eventEmitter.emit("history_updated");
  };

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    if (eventEmitter) {
      eventEmitter.on("history_updated", getHistory);
    }

    return () => {
      if (eventEmitter) {
        eventEmitter.off("history_updated", getHistory);
      }
    };
  }, [eventEmitter, getHistory]);

  return { conversionHistory, deleteHistoryItem };
};

export default useConversionHistory;
