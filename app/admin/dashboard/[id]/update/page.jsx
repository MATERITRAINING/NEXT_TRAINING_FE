"use client";
import React, { useCallback } from "react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import useProductService from "../../service";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { HiDocumentAdd } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import ProtectedPage from "@/components/ProtectPage";
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
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import * as Yup from "yup";
import DropzoneUpload from "@/components/UploadFileSingle";
import CurrencyInput from "@/components/CurenncyInput";
import InputDate from "@/components/InputDate";
import { useUploadSingle } from "@/services/uploadFile";

const CreateProductSchema = Yup.object({
  name: Yup.string().nullable().required("Wajib"),
  description: Yup.string().nullable().required("Wajib"),
  category: Yup.string().nullable().required("Wajib"),
  cost: Yup.string().nullable().required("Wajib"),
  openDate: Yup.string().nullable().required("Wajib"),
});

const UpdateProductForm = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const pathname = usePathname();
  const { useUpdateProduct, useDetailProduct } = useProductService();
  const { data, isFetching } = useDetailProduct(id);
  const { mutate, isLoading } = useUpdateProduct(id);
  const uploadFile = useUploadSingle();

  const onSubmit = async (values, { resetForm }) => {
    // await createProduct(values, resetForm);
    try {
      if (!!values.file === true) {
        const response = await uploadFile(values);
        values.image = response.data.data.fileUrl;
      }

      await mutate(values, {
        onSuccess: () => {
          resetForm();
          router.push(`/admin/dashboard`);
        },
      });
    } catch (err) {
      console.log("er", err);
    }
  };

  const initialValues = {
    openDate: data?.data?.openDate,
    name: data?.data?.name || "",
    description: data?.data?.description || "",
    image: data?.data?.image || "",
    cost: data?.data?.cost || null,
    category: data?.data?.category,
    file: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: CreateProductSchema,
    enableReinitialize: true,
  });
  let {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldTouched,
    setFieldValue,
  } = formik;

  return (
   <ProtectedPage accessMenu="product crud" permission="updated">
     <FormikProvider value={values}>
      <Container>
        <h2 className="text-3xl font-bold mb-10 text-[#38A169] ">
          Update Form
        </h2>

        <Form onSubmit={handleSubmit}>
          {!!values.image && (
            // <Image
            //   src={values.image}

            //   width={1200}
            //   height={800}
            //   alt="image profile"
            // />
            <section className="iframe-container-chat h-44 mt-2">
              <iframe src={values.image} title="Dokumen Upload"></iframe>
            </section>
          )}
          <DropzoneUpload
            onSelected={({ preview, file }) => {
              console.log("jalan");
              setFieldValue("image", preview);
              setFieldValue("file", file);
            }}
          />

          <VStack spacing={5}>
            <FormControl isInvalid={errors?.cost}>
              <FormLabel color="#38A169" htmlFor="cost" fontWeight="semibold">
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
                value={values.openDate ? new Date(values.openDate) : null}
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
              <FormLabel color="#38A169" htmlFor="name" fontWeight="semibold">
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

            <Flex gap={5} w={"100%"}>
              <Button
                onClick={() => {
                  setValues(initialValues);
                }}
                type="button"
                width={"100%"}
                colorScheme="red"
                leftIcon={<GiCancel />}
              >
                Tutup
              </Button>
              <Button
                isDisabled={isLoading}
                type="submit"
                width={"100%"}
                colorScheme="green"
                leftIcon={<HiDocumentAdd />}
              >
                {isLoading ? <Spinner /> : "Create"}
              </Button>
            </Flex>
          </VStack>
        </Form>
      </Container>
    </FormikProvider>
   </ProtectedPage>
  );
};

export default UpdateProductForm;
