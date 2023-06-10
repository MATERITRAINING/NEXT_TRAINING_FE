import { Th as ThChakra } from "@chakra-ui/react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import clsx from "clsx";

function Sorter({ sortBy, active, onClick }) {
    let upClass = clsx('', {
      'text-sky-500 ': sortBy == 'asc' && active,
     
    });
  
    let downClass = clsx('-mt-1', {
      'text-sky-500 ': sortBy == 'desc' && active,
     
    });
    return (
      <div className='text-gray-200' onClick={onClick}>
        <div className={upClass}>
          <BiUpArrow></BiUpArrow>
        </div>
        <div className={downClass}>
          <BiDownArrow></BiDownArrow>
        </div>
      </div>
    );
  }

export function Th({ children, columnKey, sort, onToggleSort, ...props }) {
  let isSortActive = sort && columnKey && onToggleSort ? true : false;
  return (
    <ThChakra
      onClick={() => isSortActive && onToggleSort(columnKey)}
      {...props}
    >
      <span className="flex items-center ">
        <p className="mr-5">{children}</p>
       
        {isSortActive && (
          <Sorter active={sort.orderBy == columnKey} sortBy={sort.sortBy}></Sorter>
        )}
      </span>
      
    </ThChakra>
  );
}
