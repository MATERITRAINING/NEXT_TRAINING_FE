"use client";

import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  Textarea,
  Spinner,
  Flex,
  Heading,
  Spacer,
  VStack,
  IconButton,
  Box,
  GridItem,
} from "@chakra-ui/react";

import { Form, Formik, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import InputDate from "@/components/InputDate";
import CurrencyInput from "@/components/CurenncyInput";
import { DeleteIcon } from "@chakra-ui/icons";
import useList from "@/hook/useList";

import useProductService from "../service"; //import

const createProductSchema = Yup.object({
  name: Yup.string().nullable().required("Wajib"),
  description: Yup.string().nullable().required("Wajib"),
  category: Yup.string().nullable().required("Wajib"),
  cost: Yup.string().nullable().required("Wajib"),
  openDate: Yup.string().nullable().required("Wajib"),

  // level: Yup.string().required("Wajib Pilih"),
});

let productArraySchema = Yup.object().shape({
  payload: Yup.array().of(createProductSchema),
});

const Create = () => {
  const { listCategory } = useList();
  const { useCreateProduct } = useProductService(); //define hook create service //step 2
  const mutate = useCreateProduct(); //step 3
  const initialValues = {
    payload: [
      {
        name: "",
        description: "",
        category: "",
        cost: null,
        openDate: "",
      },
    ],
  };
  const onSubmit = async (values, { resetForm, setValues }) => {
    await mutate.mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(initialValues)

      },
    });
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: productArraySchema,
    enableReinitialize: true,
  });
  let {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = formik;
  return (
    <div className="h-full w-full b">
      <FormikProvider value={values}>
        <Flex align={"center"} justify={"center"} w={"100%"}>
          <Container>
            <Heading size={"lg"} marginBottom={5} color="#38A169">
              Tambah Product
            </Heading>

            {JSON.stringify(values)}
            <Form onSubmit={handleSubmit}>
              {values?.payload?.map((value, index) => (
                <>
                  <Flex alignItems={"right"}>
                    <Spacer />
                    <Box>
                      <IconButton
                        isDisabled={values.payload.length === 1}
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => {
                          let filtered = values.payload.filter(
                            (i, itemIndex) => {
                              return itemIndex !== index;
                            }
                          );

                          setFieldValue("payload", filtered);
                        }}
                      />
                    </Box>
                  </Flex>

                  <VStack key={index} shadow={"lg"} p={10} spacing={5}>
                    <FormControl isInvalid={errors?.payload?.[index]?.cost}>
                      <FormLabel
                        color="#38A169"
                        htmlFor={`payload[${index}]cost`}
                        fontWeight="semibold"
                      >
                        Harga Product
                      </FormLabel>
                      <CurrencyInput
                        id="cost"
                        name={`payload[${index}]cost`}
                        isInvalid={errors?.payload?.[index]?.cost}
                        value={value.cost}
                        onChange={(e) => {
                          setFieldValue(
                            `payload[${index}]cost`,
                            Number(e.value) || null
                          );
                        }}
                        onBlur={() =>
                          formik.setFieldTouched(`payload[${index}]cost`)
                        }
                      />
                      <FormErrorMessage fontWeight="bold">
                        {errors?.payload?.[index]?.cost}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.payload?.[index]?.openDate}>
                      <FormLabel
                        color="#38A169"
                        htmlFor={`payload[${index}]openDate`}
                        fontWeight="semibold"
                      >
                        Tanggal
                      </FormLabel>
                      <InputDate
                        value={value.openDate ? new Date(value.openDate) : null}
                        name={`payload[${index}]openDate`}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue(`payload[${index}]openDate`, e);
                        }}
                        isInvalid={errors?.payload?.[index]?.openDate}
                      />
                      <FormErrorMessage fontWeight="bold">
                        {errors?.payload?.[index]?.openDate}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.payload?.[index]?.name}>
                      <FormLabel
                        color="#38A169"
                        htmlFor={`payload[${index}]name`}
                        fontWeight="semibold"
                      >
                        Nama Product
                      </FormLabel>
                      <Input
                        id={`payload[${index}]name`}
                        name={`payload[${index}]name`}
                        type="text"
                        value={value.name}
                        onChange={(e) => {
                          setFieldValue(
                            `payload[${index}]name`,
                            e.target.value
                          );
                        }}
                        onBlur={handleBlur}
                        placeholder="Ketikname"
                      />

                      <FormErrorMessage fontWeight="bold">
                        {errors?.payload?.[index]?.name}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.payload?.[index]?.category}>
                      <FormLabel
                        color="#38A169"
                        htmlFor={`payload[${index}]category`}
                        fontWeight="semibold"
                      >
                        Kategori
                      </FormLabel>
                      <Select
                        id={`payload[${index}]category`}
                        name={`payload[${index}]category`}
                        type="text"
                        value={value.category}
                        onChange={handleChange}
                        placeholder="Pilih"
                      >
                        {listCategory &&
                          listCategory?.data?.map((item, index) => {
                            return (
                              <option key={index} value={item.first_name}>
                                {item.first_name}
                              </option>
                            );
                          })}
                      </Select>

                      <FormErrorMessage fontWeight="bold">
                        {errors?.payload?.[index]?.category}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.payload?.[index]?.description}
                    >
                      <FormLabel
                        color="#38A169"
                        htmlFor={`payload[${index}]description`}
                        fontWeight="semibold"
                      >
                        Deskripsi
                      </FormLabel>
                      <InputGroup>
                        <Textarea
                          id={`payload[${index}]description`}
                          name={`payload[${index}]description`}
                          type="text"
                          value={value.description}
                          onChange={handleChange}
                          placeholder="Ketikname"
                        />
                      </InputGroup>

                      <FormErrorMessage fontWeight="bold">
                        {errors?.payload?.[index]?.description}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                </>
              ))}

              <Button
                onClick={() => {
                  setFieldValue("payload", [
                    ...values?.payload,
                    {
                      name: "",
                      description: "",
                      category: "",
                      cost: null,
                      openDate: "",
                    },
                  ]);
                }}
              >
                Tambah
              </Button>

              <Flex gap={5} w={"100%"}>
                <Button type="button" width={"100%"} colorScheme="red">
                  Tutup
                </Button>
                <Button
                  isDisabled={mutate.isLoading}
                  isLoading={mutate.isLoading}
                  type="submit"
                  width={"100%"}
                  colorScheme="green"
                >
                  Create
                </Button>
              </Flex>
            </Form>
          </Container>
        </Flex>
      </FormikProvider>
    </div>
  );
};

export default Create;
