"use client";

import React from "react";

import * as Yup from "yup";
import { Box, Center, VStack } from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

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

export default function Login() {
  const [show, setShow] = React.useState(false);

  // ...

  // Fungsi untuk menampilkan pesan kesalahan saat respons gagal login diterima

  return (
    <Center axis="both" h="100vh">
      <Box w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "30%" }}>
       
          <Heading marginBottom={5} size={"lg"} color="#38A169">
            Login Form
          </Heading>
        
            <VStack w="100%" spacing={5}>
              <FormControl>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input id="email" type="text" placeholder="Ketik email" />

                <FormErrorMessage fontWeight="bold"></FormErrorMessage>
              </FormControl>
              <FormControl>
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

                <FormErrorMessage fontWeight="bold"></FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width={"100%"}
                color={"white"}
                backgroundColor={"#38A169"}
              >
                Login
              </Button>
              <Button colorScheme="gray" leftIcon={<FcGoogle />}>
                Sign Google
              </Button>
            </VStack>
         
      </Box>
    </Center>
  );
}
