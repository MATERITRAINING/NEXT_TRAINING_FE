"use client";

import React, { useState } from "react";
import { Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Box, Center, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { login } from "@/services/authService";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
  Heading,
  Grid,
} from "@chakra-ui/react";

const LoginSchema = Yup.object({
  email: Yup.string()
    .nullable()
    .required("wajib")
    .email("Format Email tidak Valid"),
  password: Yup.string().min(8, "minimal 8 karakter").required("wajib"),
});

export default function Login() {
  const toast = useToast();
  const { data: session, status } = useSession();

  console.log("session", session);
  console.log("status", status);
  const [show, setShow] = React.useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log("values", values);

      const response = await login(values);
      console.log("response", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      toast({
        title: "Success",
        description: response.data.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });

      await signIn("credentials", {
        users: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        redirect : true
      });
    } catch (err) {
      console.log("err", err.response);

      if (err.response.status === 422) {
        toast({
          title: "Warning",
          description: err.response.data.msg,
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: "Server Error",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      console.log("final");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    resetForm,
  } = formik;
  // ...

  // Fungsi untuk menampilkan pesan kesalahan saat respons gagal login diterima

  return (
    <Center axis="both" h="100vh">
      <Box w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "30%" }}>
        <Heading marginBottom={5} size={"lg"} color="#38A169">
          Login Form
        </Heading>
        {JSON.stringify(errors)}

        <FormikProvider value={values}>
          <Form onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  placeholder="Ketik email"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.password}
                isRequired={values.email === "" ? true : false}
              >
                <FormLabel
                  color="#38A169"
                  htmlFor="password"
                  fontWeight="semibold"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="************"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage fontWeight="bold">
                  {errors.password}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="button"
                width={"100%"}
                color={"white"}
                backgroundColor={"red"}
                onClick={() => signIn()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                width={"100%"}
                color={"white"}
                backgroundColor={"#38A169"}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Login
              </Button>
              <Button colorScheme="gray" leftIcon={<FcGoogle />}>
                Sign Google
              </Button>
            </VStack>
          </Form>
        </FormikProvider>
      </Box>
    </Center>
  );
}
