import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; //import
import useAxiosAuth from "@/hook/useAuthAxios";
import useNotification from "@/hook/useNotification";
import { useSession } from "next-auth/react";
export default function useProductService() {
  const axiosClient = useAxiosAuth();
  const { toastSuccess, toastWarning, toastDanger } = useNotification();
  const { data: session } = useSession();
  const queryClient = useQueryClient(); //define ke konstanta

  const useCreateProduct = () => {
    const mutate = useMutation(
      (payload) => {
        return axiosClient.post("/product/create-bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.msg);
          queryClient.invalidateQueries("/product/list");
        },
        onError: (error) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastDanger();
          }
        },
        onSettled: (respose) => {},
      }
    );

    return mutate;
  };

  const useDeleteProduct = () => {
    const mutate = useMutation(
      (payload) => {
        return axiosClient.post("/product/delete-bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.msg);
          queryClient.invalidateQueries("/product/list");
        },
        onError: (error) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastDanger();
          }
        },
        onSettled: (respose) => {},
      }
    );

    return mutate;
  };

  const useListProduct = (defaultParams) => {
    const [params, setParams] = useState({
      page: 1,
      pageSize: 10,
      q: "",
      ...defaultParams,
    });

    const { data, isLoading, isFetching } = useQuery(
      ["/product/list", params],
      () =>
        axiosClient.get("/product/list", {
          params,
        }),
      {
        select: (response) => response.data,

        enabled: session?.user?.accessToken !== undefined,
      }
    );

    return { data, isFetching, isLoading, params, setParams };
  };

  const useDetailProduct = (id) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/product/detail", {id}],
      () =>
        axiosClient.get(`/product/${id}/detail`),
      {
        select: (response) => response.data,

        enabled: session?.user?.accessToken !== undefined && id !== undefined,
      }
    );

    return { data, isFetching, isLoading };
  };

  return { useListProduct, useCreateProduct, useDetailProduct };
}
