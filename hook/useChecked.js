import { useState, useMemo } from "react";

export default function useChecked(data) {
  const [payload, setPayload] = useState([]);

  const memo = useMemo(() => {
    if (data !== undefined) {
      const isAllChecked = data.every((n) => payload.includes(n.id)); //true false
      const selected = data.filter((n) => payload.includes(n.id)); //array
      return {
        isAllChecked: !!selected.length && isAllChecked,
        isIndeterminate: !!selected.length && !isAllChecked,
      };
    } else {
      return {
        isAllChecked: false,
        isIndeterminate: false,
      };
    }
  }, [data, payload]);

  const checkedAllHandle = () => {
    if (memo.isAllChecked || memo.isIndeterminate) {
      setPayload([]);
    } else {
      const selected = Array.from(new Set([...payload, data.map((n) => n.id)]));

      setPayload(selected[0]);
    }
  };

  const checkedItemHandle = (id) => {
    if (payload.includes(id)) {
      let filtered = payload?.filter((idx) => idx !== id);

      setPayload(filtered);
    } else {
      setPayload([...payload, id]);
    }
  };

  return {
    payload,
    setPayload,
    isAllChecked: memo.isAllChecked,
    isIndeterminate: memo.isIndeterminate,
    checkedAllHandle,
    checkedItemHandle,
  };
}