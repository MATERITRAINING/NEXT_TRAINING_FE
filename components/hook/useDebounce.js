import { useEffect, useState } from "react";

export default function useDebounce(value, delay, setPage = () => {}) {
  const [debouncedValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const interval = setTimeout(() => {
      setDebounceValue(value);
      setPage(1);
    }, delay);

    return () => clearTimeout(interval);
  }, [value, delay]);

  return debouncedValue;
}
