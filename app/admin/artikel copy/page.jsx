"use client";
import React, { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import useChecked from "@/hook/useChecked";
import useConfirmSubmit from "@/hook/useConfirmSubmit";
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
  Spinner,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import useArtikelService from "@/service/productServices";
import ModalForm from "@/components/ModalForm";
import CreateArtikelForm from "@/module/admin/product/CreateForm";

import Pagination from "@/components/Pagination";
import Loading from "@/app/app-isr/loading";
import { DeleteButton, UpdateButton } from "@/components/ActionButton";
const Konsep = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useListArtikel, useDeleteArtikel } = useArtikelService();
  const { mutate, isLoading: isLoadingDelete } = useDeleteArtikel();
  const { data, isLoading, params, setParams } = useListArtikel();

  const {
    payload: deleteArtikel,
    setPayload: setDeleteArtikel,
    isAllChecked,
    isIndeterminate,
    checkedAllHandle,
    checkedItemHandle,
  } = useChecked(data?.data);

  const onDeleteSubmit = useConfirmSubmit({
    onSubmit: (payload) => {
      mutate(payload, {
        onSuccess: () => {
          setDeleteArtikel([]);
        },
      });
    },
    options: {
      title: "Apakah yakin akan menghapus item yang dipilih?",
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-full w-full ">
      <ModalForm isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <CreateArtikelForm onClose={onClose} />
      </ModalForm>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            colorScheme="red"
            onClick={() => onDeleteSubmit(deleteArtikel)}
            isLoading={isLoadingDelete}
            isDisabled={deleteArtikel.length < 1}
          >
            Hapus
          </Button>
          <Button onClick={() => onOpen()} colorScheme="teal">
            Tambah
          </Button>
        </ButtonGroup>
      </Flex>

      <p>Total : {data.pagination.total}</p>

      <Box p="2">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isIndeterminate={isIndeterminate}
                    isChecked={isAllChecked}
                    onChange={checkedAllHandle}
                  />
                </Th>
                <Th>No</Th>
                <Th>title</Th>
                <Th>description</Th>
                <Th isNumeric>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Checkbox
                        isChecked={deleteArtikel.includes(item.id)}
                        onChange={(e) => checkedItemHandle(e, item.id)}
                      />
                    </Td>
                    <Td>{(params.page - 1) * params.pageSize + index + 1}</Td>
                    <Td>{item.title}</Td>
                    <Td>{item.description}</Td>
                    <Td>
                      <HStack spacing={3}>
                        <UpdateButton
                          onClick={() => {
                            router.push(`${pathname}/${item.id}/update`);
                          }}
                        />
                        <DeleteButton />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Pagination
            page={params.page}
            setParams={setParams}
            params={params}
            pageSize={params.pageSize}
            total={data.pagination.total}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default Konsep;
