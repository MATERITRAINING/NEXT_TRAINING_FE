"use client";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import useProtected from "@/hook/useProtected";

export function UpdateButton({ accessMenu = "false", ...props }) {
  const { access } = useProtected(accessMenu, "updated");

  if (access) {
    return <IconButton icon={<EditIcon />} colorScheme="blue" {...props} />;
  } else {
    return <></>;
  }
}

export function DeleteButton({ accessMenu = "false", ...props }) {
  const { access } = useProtected(accessMenu, "deleted");

  if (access) {
    return <IconButton icon={<DeleteIcon />} colorScheme="red" {...props} />;
  } else {
    return <></>;
  }
}