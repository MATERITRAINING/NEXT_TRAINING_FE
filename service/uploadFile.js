import { useState } from "react";
import useAxiosAuth from "../hook/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";

export const useUploadSingle = (payload) => {
  const axiosAuth = useAxiosAuth();



  const uploadFile = (payload) => {
    const formUpload = new FormData();
    formUpload.append("file", payload?.file);
    return axiosAuth.post("/upload/single", formUpload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  

  

  return uploadFile
};
