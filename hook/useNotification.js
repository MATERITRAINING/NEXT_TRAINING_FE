import { useToast } from "@chakra-ui/react";

export default function useNotification() {
  const toast = useToast({ position: "top-right" });

  function toastSuccess(msg) {
    toast({
      position: "top-right",
      title: "Berhasil",
      description: msg,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  function toastError() {
    toast({
      title: "Error",
      description: "Ada Kesalahan",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  function toastWarning(msg) {
    toast({
      title: "Warning",
      description: msg,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  }

  return { toastSuccess, toastError, toastWarning };
}
