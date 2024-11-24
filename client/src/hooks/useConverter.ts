import { useEffect, useState } from "react";
import { useEventEmitter } from "../components/EventEmitterProvider";
import { ConversionRecord, Currencies } from "../types";
import { toast } from "react-toastify";
import { fetchConversionRate, fetchCurrencies } from "../api/convert";
import useIndexedDB from "./useIndexedDb";
import { INDEXED_DB } from "../utils/constants";

const useConverter = () => {
  const [amount, setAmount] = useState<string>("");
  const { addItem } = useIndexedDB(INDEXED_DB.dbName, INDEXED_DB.storeName);

  const { eventEmitter } = useEventEmitter();
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
    const newRecord: ConversionRecord = {
      id: Date.now(),
      fromCurrency,
      toCurrency,
      amount,
      result: resultString,
      date: new Date(),
    };

    await addItem(newRecord);
    eventEmitter.emit("history_updated");
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

  return {
    setAmount,
    result,
    converting,
    currencies,
    handleConvert,
    fromCurrency,
    toCurrency,
    amount,
    setFromCurrency,
    setToCurrency,
  };
};

export default useConverter;
