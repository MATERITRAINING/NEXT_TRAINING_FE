import { useState } from 'react';

function useSort(initial, sortBy = 'desc') {
  let [sort, setSort] = useState({
    column: initial,
    order: sortBy,
  });
  function toggleSort(column) {
    //check is clicked column same with prev clicked column

   
    if (column == sort.column) {
      setSort({
        column: column,
        order: sort.order == 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSort({
        column: column,
        order: 'desc',
      });
    }
  }
  return { sort, setSort, toggleSort };
}

export default useSort;
