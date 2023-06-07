import { useEffect, useState } from "react";

// export default function useDebounce(value, delay, setPage = () => {}) {
//   const [debouncedValue, setDebounceValue] = useState(value);
//   useEffect(() => {
//     const interval = setTimeout(() => {
//       setDebounceValue(value);
//       setPage(1);
//     }, delay);

//     return () => clearTimeout(interval);
//   }, [value, delay]);

//   return debouncedValue;
// }

export default function useDebounce({ onSearch, delay }) {
  const [keyword, setKeyword] = useState("");

  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }
  useEffect(() => {
    const interval = setTimeout(() => {
      onSearch(keyword);
    }, delay);

    return () => clearTimeout(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, delay]);

  return { keyword, setKeyword, handleKeyword };
}
