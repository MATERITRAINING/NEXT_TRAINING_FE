import { useState, useCallback } from "react";

export default function useFilter({ onFilter, onReset }) {
  const [queryString, setQueryString] = useState({});
  const resetFilter = () => {
    setQueryString({});
    onReset();
  };

  const submitFilter = useCallback(
    (filterResult) => {
      onFilter(filterResult);

      setQueryString(filterResult);
    },
    [onFilter]
  );

  return { queryString, submitFilter, resetFilter };
}
