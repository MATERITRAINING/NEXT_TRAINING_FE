"use client";

import React, { useEffect, useState } from "react";
import { Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Box, Center, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import useAuthStore from "@/store/useAuthStore";

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
import authService from "@/service/authService";
import LoadingPage from "@/components/LoadingPage";

const LoginSchema = Yup.object({
  email: Yup.string().nullable().required("Wajib").email("Wajin Email"),
  password: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
});

export default function Login() {
  const { data: session, status } = useSession();
  const user = useAuthStore((state) => state.user);
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  // ...

  // Fungsi untuk menampilkan pesan kesalahan saat respons gagal login diterima
  const handleLoginFailure = (errorMessage) => {
    setError(errorMessage);
  };

  const toast = useToast({
    duration: 5000,
    position: "top-right",
  });

  useEffect(() => {
    if (session?.user.role === "admin") {
      router.push("/admin");
    }
    if (session?.user.role === "member") {
      router.push("/member");
    }
  }, [session, status, router]);

  const handleGoogleLogin = async (values) => {
    const res = await signIn("google", undefined, {
      prompt: "select_account",
    });
    console.log("rew", res);
  };
  const onSubmit = async (values) => {
    try {
      const response = await authService.login(values);
      // const permission = await authService.permission(response.data.user.id);

      toast({
        title: "Success",
        description: response.data.msg,
        status: "success",
        isClosable: true,
      });

      await signIn("credentials", {
        email: response.data.user.email,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        name: response.data.user.name,
        picture: response.data.user.picture,
        role: response.data.user.role,
        id: response.data.user.id,
        // permission: JSON.stringify( permission.data),
        redirect: true,
      });
    } catch (err) {
      if (err.response.status === 422) {
        toast({
          title: "Warning",
          description: err.response.data.msg,
          status: "warning",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: err.response.data.msg,
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    enableReinitialize: true,
  });

  let {
    values,
    errors,

    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  } = formik;

  if (session) {
    return <LoadingPage />;
  }

  return (
    <Center axis="both" h="100vh">
      <Box w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "30%" }}>
        <FormikProvider value={values}>
          <Heading marginBottom={5} size={"lg"} color="#38A169">
            Login Form
          </Heading>
          <Form onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl isInvalid={errors?.email}>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ketik email"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors?.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.password}>
                <FormLabel
                  color="#38A169"
                  htmlFor="password"
                  fontWeight="semibold"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  {errors?.password}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width={"100%"}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                color={"white"}
                backgroundColor={"#38A169"}
              >
                Login
              </Button>
              <Button
                onClick={handleGoogleLogin}
                colorScheme="gray"
                leftIcon={<FcGoogle />}
              >
                Sign Google
              </Button>
            </VStack>
          </Form>
        </FormikProvider>
      </Box>
    </Center>
  );
}
