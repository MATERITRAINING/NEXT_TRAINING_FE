import { useState } from "react";

function useSort( orderBy = "id", sortBy = "desc" ) {
  let [sort, setSort] = useState({
    orderBy: orderBy,
    sortBy: sortBy,
  });
  function toggleSort(orderBy,setParams) {
    setParams((params) => ({
      ...params,
      orderBy: sort.orderBy,
      sortBy: sort.sortBy,
    }));
    //check is clicked orderBy same with prev clicked orderBy

    if (orderBy == sort.orderBy) {
      setSort({
        orderBy: orderBy,
        sortBy: sort.sortBy == "asc" ? "desc" : "asc",
      });
    } else {
      setSort({
        orderBy: orderBy,
        sortBy: "desc",
      });
    }
  }
  return { sort, setSort, toggleSort };
}

export default useSort;
