"use client";
import React, { useCallback } from "react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import useProductService from "@/service/productServices";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
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
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useUploadSingle } from "@/service";
import DropzoneUpload from "@/components/UploadFileSingle";
import CurrencyInput from "@/components/CurenncyInput";
import InputDate from "@/components/InputDate";
const CreateProductSchema = Yup.object({
  name: Yup.string().nullable().required("Wajib"),
  openDate: Yup.string()
    // .max(10, "format tanggal tidak sesuai")
    .nullable()
    .required("Wajib"),
  description: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
  cost: Yup.number().required("Wajib Pilih"),
});

const UpdateProductForm = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { useUpdateProduct, useDetailProduct } = useProductService();
  const { data, isFetching } = useDetailProduct({ id: params.id });
  const { mutate, isLoading } = useUpdateProduct({ id: params.id });
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
          //   resetForm();
          //   router.push(`/admin/artikel`);
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

    setFieldTouched,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={values}>
     
    
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-[#38A169] ">
            Update Form
          </h2>

          <Form onSubmit={handleSubmit}>
            {!!values.image && (
              <Image
                src={values.image}
                layout="responsive"
                width={1200}
                height={800}
                alt="image profile"
              />
            )}
            <DropzoneUpload
              onSelected={({ preview, file }) => {
                console.log("jalan");
                setFieldValue("image", preview);
                setFieldValue("file", file);
              }}
            />
            <section className="space-y-5">
              <FormControl isInvalid={errors?.name}>
                <FormLabel color="#38A169" htmlFor="name" fontWeight="semibold">
                  Judul
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Ketik name"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors?.name}
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
                    placeholder="Ketik name"
                  />
                </InputGroup>

                <FormErrorMessage fontWeight="bold">
                  {errors?.description}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.cost}>
                <FormLabel>Rupiah</FormLabel>
                <CurrencyInput
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
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
               <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl> <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
               <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl> <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel>Tanggal</FormLabel>
                <InputDate
                  isInvalid={errors.openDate}
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate", e)}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>

              <Button
                isDisabled={isLoading}
                type="submit"
                width={"100%"}
                colorScheme="green"
              >
                {isLoading ? <Spinner /> : "Update"}
              </Button>
              <Button
                onClick={() => router.push("/admin/product")}
                type="button"
                width={"100%"}
                colorScheme="green"
              >
                Kembali
              </Button>
            </section>
          </Form>
        </Container>
   
    </FormikProvider>
  );
};

export default UpdateProductForm;
