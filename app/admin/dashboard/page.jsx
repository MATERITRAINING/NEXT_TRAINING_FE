"use client";

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
  Flex,
  Box,
  Input,
  Select,
  Spacer,
  Spinner,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import DrawerFilter from "@/components/DrawerFilter";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { formatDateInd } from "@/utils/date";
import useDebounce from "@/hook/useDebounce";
import useNotification from "@/hook/useNotification";
import Pagination from "@/components/Pagination";
import useProductService from "@/services/productService";
import { FiFilter } from "react-icons/fi";
import Filter from "./module/Filter";
import useFilter from "@/hook/useFilter";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";

function PAge() {
  const axiosClient = useAxiosAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useListProduct } = useProductService();
  const { data, isFetching, isLoading, setParams, params } = useListProduct();
  const { toastSuccess, toastWarning } = useNotification();
  const { data: session } = useSession();
  const [q, setQ] = useState(null);
  const { queryString, submitFilter, resetFilter } = useFilter({
    onFilter: (filterResult) => {
      setParams((prevParams) => ({
        ...prevParams,
        page: 1,
        q: "",
        ...filterResult,
      }));
    },
    onReset: () => {
      setParams(() => ({
        page: 1,
        pageSize: 10,
        q: "",
      }));
    },
  });

  const { keyword, setKeyword, handleKeyword } = useDebounce({
    delay: 1000,
    onSearch: (keyword) => {
      setParams({
        page: 1,
        pageSize: params.pageSize,
        q: keyword,
      });
    },
  });

  return (
    <div className="w-full h-full p-10">
      <DrawerFilter
        title="Filter Produk"
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      >
        <Filter
          value={queryString}
          onClose={onClose}
          resetFilter={resetFilter}
          submitFilter={submitFilter}
        />
      </DrawerFilter>

      {JSON.stringify(params)}
      <Flex minWidth={"max-content"} alignItems={"center"} gap={2}>
        <Box p={2}>
          <Button colorScheme="teal" onClick={onOpen} leftIcon={<FiFilter />}>
            Filter
          </Button>
        </Box>

        <Spacer />
        <Box p={2}>
          <Input
            value={keyword}
            onChange={handleKeyword}
            placeholder="Cari ..."
          />
        </Box>
        <Box p={2}>
          <Link href={"/admin/dashboard/create"}>
            <Button leftIcon={<AddIcon />} colorScheme="teal">
              Tambah
            </Button>
          </Link>
        </Box>
      </Flex>
      {isFetching && <p>Fetching</p>}
      {isLoading && <p>Loading</p>}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Image</Th>
              <Th>Nama</Th>
              <Th>Kategori</Th>
              <Th>Tanggal</Th>
              <Th>Harga</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.data.map((item, index) => (
                <Tr key={index}>
                  <Td>{(params.page - 1) * params.pageSize + index + 1}</Td>
                  <Td>Image</Td>
                  <Td>{item.name || "-"}</Td>
                  <Td>{item.category || "-"}</Td>
                  <Td>{formatDateInd(item.openDate)}</Td>
                  <Td>{item.cost || "-"}</Td>
                  <Td>Aksi</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Pagination
          setParams={setParams}
          params={params}
          page={params.page}
          pageSize={params.pageSize}
          total={data?.pagination.total || 0}
        />
      </TableContainer>
    </div>
  );
}

export default PAge;
