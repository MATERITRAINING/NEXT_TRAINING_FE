"use client";
import React, { useCallback } from "react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import useArtikelService from "@/service/productServices";
import Image from "next/image";
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
const CreateArtikelSchema = Yup.object({
  title: Yup.string().nullable().required("Wajib"),
  description: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
  // level: Yup.string().required("Wajib Pilih"),
});

const UpdateArtikelForm = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { useUpdateArtikel, useDetailArtikel } = useArtikelService();
  const { data, isFetching } = useDetailArtikel({ id: params.id });
  const { mutate, isLoading } = useUpdateArtikel({ id: params.id });
  const uploadFile = useUploadSingle();
  const onDrop = useCallback(async (acceptedFiles) => {
    const preview = await acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFieldValue("thumbnail", preview[0].preview);
    setFieldValue("file", acceptedFiles[0]);

    console.log("pre", preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const onSubmit = async (values, { resetForm }) => {
    // await createArtikel(values, resetForm);
    try {
      if (!!values.file === true) {
        const response = await uploadFile(values);
        values.thumbnail = response.data.data.fileUrl;
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
    title: data?.data?.title || "",
    description: data?.data?.description || "",
    thumbnail: data?.data?.thumbnail || "",
    file: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: CreateArtikelSchema,
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

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <FormikProvider value={values}>
      <div className="w-full   px-5  flex items-center justify-center">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-[#38A169] ">
            Update Form
          </h2>

          {!!values.thumbnail && (
            <Image
              src={values.thumbnail}
              height={200}
              width={100}
              alt="image profile"
            />
          )}
          <Form onSubmit={handleSubmit}>
           
            <section className="space-y-5">
              <FormControl isInvalid={errors?.title}>
                <FormLabel
                  color="#38A169"
                  htmlFor="title"
                  fontWeight="semibold"
                >
                  Judul
                </FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Ketik title"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors?.title}
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
                    placeholder="Ketik title"
                  />
                </InputGroup>

                <FormErrorMessage fontWeight="bold">
                  {errors?.description}
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
              <Button onClick={()=> router.push('/admi')} type="button" width={"100%"} colorScheme="green">
                Kembali
              </Button>
            </section>
          </Form>
        </Container>
      </div>
      ok
    </FormikProvider>
  );
};

export default UpdateArtikelForm;
