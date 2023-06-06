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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/components/hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { formatDateInd } from "@/utils/date";
import useDebounce from "@/components/hook/useDebounce";

function PAge() {
  const axiosClient = useAxiosAuth();
  const { data: session } = useSession();
  const [q, setQ] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const debouncedValue = useDebounce(q, 10000, setPage);

  const { data, isLoading, isFetching } = useQuery(
    ["/product/list", { page, pageSize, q: debouncedValue }],
    () =>
      axiosClient.get("/product/list", {
        params: {
          page,
          pageSize,
          q,
        },
      }),
    {
      select: (response) => response.data,
      enabled: session?.user?.accessToken !== undefined,
    }
  );

  return (
    <div className="w-full h-full p-10">
      <Flex minWidth={"max-content"} alignItems={"center"} gap={2}>
        <Box p={2}>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </Select>
        </Box>

        <Spacer />
        <Box p={2}>
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            placeholder="Cari ..."
          />
        </Box>
      </Flex>
      {isFetching && <Spinner />}
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
                  <Td>{index + 1}</Td>
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
      </TableContainer>
    </div>
  );
}

export default PAge;
