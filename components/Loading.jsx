'use client'
import React from "react";
import { Spinner } from "@chakra-ui/react";
function Loading({ size = "md" }) {
  return (
    <Spinner
      size={size}
      thickness="3px"
      color="blue.400"
      emptyColor="gray.200"
    ></Spinner>
  );
}

export default Loading;
