"use client";
import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
  Spacer,
  ButtonGroup,
  Heading,
  Box,
  useDisclosure,
  Checkbox,
  Select,
} from "@chakra-ui/react";
const Pagination = ({ page, pageSize, total, setParams, params }) => {
  function getPage(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  let pages = getPage(total, page, pageSize);
  return (
    <Flex mt={5}>
      <Box>
        <Select
          value={pageSize}
          onChange={(e) => {
            setParams({
              ...params,
              pageSize: e.target.value,
              page:1
            });
          }}
        >
           <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={250}>250</option>
        </Select>
      </Box>
      <Spacer />
      <section className="flex items-center space-x-5">
        {pages.pages.map((page, index) => (
          <button
            onClick={(e) => {
              setParams({
                ...params,
                page: page,
              });
            }}
            key={index}
            className="border h-8 w-8 hover:bg-gray-300 rounded-full p-1 "
          >
            {page}
          </button>
        ))}
      </section>
    </Flex>
  );
};

Pagination.propTypes = {};

export default Pagination;

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired,
};
