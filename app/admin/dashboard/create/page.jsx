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
  
} from "@chakra-ui/react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import InputDate from "@/components/InputDate";
import CurrencyInput from "@/components/CurenncyInput";
import { DeleteIcon } from "@chakra-ui/icons";

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
  const onSubmit = (value) => {
    console.log("ok");
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
            <Form onSubmit={handleSubmit}>
              {values?.payload?.map((value, index) => (
                <>
                  <VStack key={index} shadow={"lg"} p={10} spacing={5}>
                    <Flex alignItems={"right"}>
                      <Spacer/>
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

                    
                    <FormControl isInvalid={errors?.cost}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="cost"
                        fontWeight="semibold"
                      >
                        Nama Product
                      </FormLabel>
                      <CurrencyInput
                        id="cost"
                        isInvalid={errors.cost}
                        value={values.cost}
                        onChange={(e) => {
                          setFieldValue(`cost`, Number(e.value) || null);
                        }}
                        onBlur={() => formik.setFieldTouched("cost")}
                      />
                      <FormErrorMessage fontWeight="bold">
                        {errors?.cost}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.openDate}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="openDate"
                        fontWeight="semibold"
                      >
                        Tanggal
                      </FormLabel>
                      <InputDate
                        value={
                          values.openDate ? new Date(values.openDate) : null
                        }
                        name="openDate"
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("openDate", e)}
                        isInvalid={errors.openDate}
                      />
                      <FormErrorMessage fontWeight="bold">
                        {errors?.openDate}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.name}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="name"
                        fontWeight="semibold"
                      >
                        Nama Product
                      </FormLabel>
                      <Input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Ketikname"
                      />

                      <FormErrorMessage fontWeight="bold">
                        {errors?.name}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.category}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="category"
                        fontWeight="semibold"
                      >
                        Kategori
                      </FormLabel>
                      <Select
                        id="category"
                        type="text"
                        value={values.category}
                        onChange={handleChange}
                        placeholder="Pilih"
                      >
                        <option value={"handphone"}>Handphone</option>
                        <option value={"tv"}>TV</option>
                        <option value={"motor"}>Motor</option>
                      </Select>

                      <FormErrorMessage fontWeight="bold">
                        {errors?.category}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.description}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="description"
                        fontWeight="semibold"
                      >
                        Deskripsi
                      </FormLabel>
                      <InputGroup>
                        <Textarea
                          id="description"
                          type="text"
                          value={values.description}
                          onChange={handleChange}
                          placeholder="Ketikname"
                        />
                      </InputGroup>

                      <FormErrorMessage fontWeight="bold">
                        {errors?.description}
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
                <Button type="submit" width={"100%"} colorScheme="green">
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
