import { useToast } from "@chakra-ui/react";

export default function useNotification() {
  const toast = useToast({ position: "top-right" });

  function toastSuccess(msg = 'Berhasil') {
    toast({
      title: "Success",
      description: msg,
      status: "success",
      duration: 1000,
      isClosable: true,
      
    });
  }
  function toastWarning(msg = 'Perhatian') {
    toast({
      title: "Warning",
      description: msg,
      status: "warning",
      duration: 1000,
      isClosable: true,
      
    });
  }

  function toastDanger(msg = 'Gagal') {
    toast({
      title: "error",
      description: msg,
      status: "error",
      duration: 1000,
      isClosable: true,
      
    });
  }


  return {toastSuccess, toastWarning,toastDanger}
}
