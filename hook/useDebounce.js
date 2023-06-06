// import { useEffect, useState } from 'react';

import { useEffect, useState } from "react";

// export default function useDebounce(value, delay, setPage = () => {}) {
//   // State and setters for debounced value
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   const [keyword, setKey]

//   useEffect(
//     () => {
//       // Update debounced value after delay
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//         setPage(1);
//       }, delay);

//       // Cancel the timeout if value changes (also on delay change or unmount)
//       // This is how we prevent debounced value from updating if value is changed ...
//       // .. within the delay period. Timeout gets cleared and restarted.
//       return () => {
//         clearTimeout(handler);
//       };
//     },
//     [value, delay] // Only re-call effect if value or delay changes
//   );

//   return debouncedValue;
// }

export default function useDebounce({ onSubmit, delay }) {
  const [keyword, setKeyword] = useState(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      if(keyword !== null){
        onSubmit(keyword);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword, delay, onsubmit]);

  return { keyword, setKeyword };
}
