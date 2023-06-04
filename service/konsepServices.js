// import useAxiosAuth from "./useAxiosAuth";
// import { useQuery } from "@tanstack/react-query";
// import { useSession, signOut } from "next-auth/react";
// const useFetchKelas = () => {
//   const axiosAuth = useAxiosAuth();
//   const { data: session } = useSession();

//   const {
//     data: dataKelas,
//     isFetching: isFetchingKelas,
//     isLoading: isLoadingKelas,
//   } = useQuery(["/kelas/list"], () => axiosAuth.get("/kelas/list"), {

//     enabled : session?.user?.token !== undefined,
//     select: (response) => {
//       console.log("res", response);
//       return response.data.data;
//     },
//   });

//   return { dataKelas };
// };

// export default useFetchKelas

import useAxiosAuth from "../hook/useAxiosAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
const useFetchKelas = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const toast = useToast({ position: "top-right" });
  const { data: session } = useSession();

  const useKelas = (defaultPrams) => {
    const [params, setParams] = useState({
      pageSize: 10,
      page: 1,

      ...defaultPrams,
    });

    const { data, isFetching, isLoading } = useQuery(
      ["/artikel/list/middleware", [params]],
      () => axiosAuth.get("/artikel/list/middleware", { params }),
      {
        enabled: session?.user?.accessToken !== undefined,
        // staleTime: 3000, //3 s
        // refetchInterval: 5000,
        keepPreviousData: true,
        select: (response) => {
          return response.data.data;
        },
      }
    );

    return { data, isFetching, isLoading, params, setParams };
  };

  const useReqres = (defaultPrams) => {
    const [params, setParams] = useState({
      page: 1,

      ...defaultPrams,
    });

    const { data: dataReq, isFetching: isFetchingDataReq } = useQuery(
      ["reqres", [params]],
      () => axios.get("https://reqres.in/api/users", { params }),
      {
        enabled: session?.user?.accessoken !== undefined,
        select: (response) => {
          return response.data.data;
        },
       
      }
    );

    return { dataReq, isFetchingDataReq, params, setParams };
  };

  const useCreateKelas = (payload, resetForm) => {
    const { mutate: createKelas, isLoading } = useMutation(
      () => axiosAuth.post("/kelas/create", payload),
      {
        onSuccess: (res) => {
          toast({
            title: "Success",
            description: res.data.msg,
            status: "success",
            duration: 500,
            isClosable: true,
          });

          resetForm();
          queryClient.invalidateQueries({ queryKey: ["/kelas/list"] });
        },
        onError: (error) => {
          // Error actions
          console.log("err", error.re);
          toast({
            title: "Error",
            description: "Ada Kesalahan",
            status: "error",
            duration: 500,
            isClosable: true,
          });
        },
      }
    );

    return { createKelas, isLoading };
  };
  return { useKelas, useCreateKelas, useReqres };
};

export default useFetchKelas;
