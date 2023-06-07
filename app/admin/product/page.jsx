"use client";
import React, { useState, useMemo, useCallback } from "react";
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
  InputGroup,
  Input,
  InputLeftElement,
  Center,
} from "@chakra-ui/react";
import useProductService from "@/app/admin/product/service/productServices";
import ModalForm from "@/components/ModalForm";
import CreateProductForm from "@/app/admin/product/module/CreateForm";
import useDebounce from "@/hook/useDebounce";
import useFilter from "@/hook/useFilter";
import Pagination from "@/components/Pagination";
import { DeleteButton, UpdateButton } from "@/components/ActionButton";
import Image from "next/image";
import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import Filter from "@/components/Drawer";
import DrawerFilter from "@/components/Drawer";
import FilterArtikel from "@/app/admin/product/module/Filter";
import { formatDate } from "@/utils/date";
const Konsep = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useListProduct, useDeleteBulkProduct, useDeleteProduct } =
    useProductService();
  const { mutate, isLoading: isLoadingDeleteBulk } = useDeleteBulkProduct();
  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteProduct();
  const { data, isLoading, params, setParams, isFetching } = useListProduct();
  const drawerFilter = useDisclosure();
  const { queryString, submitFilter, resetFilter } = useFilter({
    onFilter: (filterResult) => {
      setParams((params) => ({ ...params, page: 1, q: "", ...filterResult }));
    },
    onReset: () => {
      setParams((params) => ({ page: 1, pageSize: 10 }));
    },
  });

  const { setKeyword, keyword } = useDebounce({
    delay: 500,
    onSubmit: (q) => {
      setParams((params) => ({
        pageSize: params.pageSize,
        page: 1,
        q: q,
      }));
    },
  });

  const {
    payload: deleteProduct,
    setPayload: setDeleteProduct,
    isAllChecked,
    isIndeterminate,
    checkedAllHandle,
    checkedItemHandle,
  } = useChecked(data?.data);

  const onDeleteBulkSubmit = useConfirmSubmit({
    onSubmit: (payload) => {
      mutate(payload, {
        onSuccess: () => {
          setDeleteProduct([]);
        },
      });
    },
    options: {
      title: "Apakah yakin akan menghapus item yang dipilih?",
    },
  });

  const onDeleteSubmit = useConfirmSubmit({
    onSubmit: (id) => {
      mutateDelete(id);
    },
    options: {
      title: "Apakah yakin akan menghapus item yang dipilih?",
    },
  });

  return (
    <div className="h-full w-full p-5 ">
      {JSON.stringify(params)}
      <DrawerFilter
        title="Filter Artikel"
        isOpen={drawerFilter.isOpen}
        onOpen={drawerFilter.onOpen}
        onClose={drawerFilter.onClose}
      >
        <FilterArtikel
          value={queryString}
          onSubmit={submitFilter}
          onReset={resetFilter}
          onClose={drawerFilter.onClose}
        />
      </DrawerFilter>
      <ModalForm isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <CreateProductForm onClose={onClose} />
      </ModalForm>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Cari ..."
            />
          </InputGroup>
        </Box>
        <Box>
          <Button
            colorScheme="facebook"
            onClick={() => drawerFilter.onOpen()}
            leftIcon={<FiFilter />}
          >
            Filter
          </Button>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            colorScheme="red"
            onClick={() => onDeleteBulkSubmit(deleteProduct)}
            isLoading={isLoadingDeleteBulk}
            isDisabled={deleteProduct.length < 1}
            leftIcon={<DeleteIcon />}
          >
            Hapus
          </Button>
          <Button
            onClick={() => onOpen()}
            colorScheme="teal"
            leftIcon={<AddIcon />}
          >
            Tambah
          </Button>
        </ButtonGroup>
      </Flex>

      <Box p="2">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr sx={{ backgroundColor: "blue.100", color: "gray.800" }}>
                <Th size="lg">
                  <Checkbox
                    isIndeterminate={isIndeterminate}
                    isChecked={isAllChecked}
                    onChange={checkedAllHandle}
                  />
                </Th>
                <Th sx={{ padding: "100x" }}>No</Th>
                <Th>Image</Th>
                <Th>Nama</Th>
                <Th>Kategori</Th>
                <Th>description</Th>
                <Th>di buka jam</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isFetching && data.data.length === 0 && (
                <Tr>
                  <Td colSpan={10}>
                    <Center>Data Tidak Ditemukan</Center>
                  </Td>
                </Tr>
              )}
              {isFetching && (
                <Tr>
                  <Td colSpan={10}>
                    <Center>
                      <Spinner />
                    </Center>
                  </Td>
                </Tr>
              )}
              {!isFetching &&
                data &&
                data.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Checkbox
                        isChecked={deleteProduct.includes(item.id)}
                        onChange={(e) => checkedItemHandle(e, item.id)}
                      />
                    </Td>
                    <Td>{(params.page - 1) * params.pageSize + index + 1}</Td>
                    <Td>
                      {!!item.image === true ? (
                        <Image
                          src={item.image}
                          height={100}
                          width={100}
                          alt="image"
                        />
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.description}</Td>
                    <Td>{formatDate(item.openDate)}</Td>
                    <Td>
                      <HStack spacing={3}>
                        <UpdateButton
                          accessMenu="product crud"
                          onClick={() => {
                            router.push(`${pathname}/${item.id}/update`);
                          }}
                        />
                        <DeleteButton
                          accessMenu="product crud"
                          onClick={() => {
                            onDeleteSubmit(item.id);
                          }}
                        />
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
            total={Number(data?.pagination?.total)}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default Konsep;
