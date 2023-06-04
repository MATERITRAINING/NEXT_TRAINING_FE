import useAxiosAuth from "../hook/useAxiosAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import useNotification from "../hook/useNotification";

const useProductService = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const { toastSuccess, toastError, toastWarning } = useNotification();

  const { data: session } = useSession();

  const useListProduct = (defaultPrams) => {
    const [params, setParams] = useState({
      pageSize: 10,
      page: 1,
      ...defaultPrams,
    });

    const { data, isFetching, isLoading } = useQuery({
      queryKey: ["/product/list", [params]],
      queryFn: () => axiosAuth.get("/product/list", { params }),
      enabled: session?.user?.accessToken !== undefined,
      // staleTime: 3000, //3 s
      // refetchInterval: 5000,

      keepPreviousData: true,
      select: (response) => {
        return response.data;
      },
    });

    return { data, isFetching, isLoading, params, setParams };
  };

  const useDetailProduct = ({ id }) => {
    const { data, isFetching, isLoading } = useQuery(
      ["/product/list/detail"],
      () => axiosAuth.get(`/product/${id}/detail`),
      {
        enabled: session?.user?.accessToken !== undefined,

        keepPreviousData: true,
        select: (response) => {
          return response.data;
        },
      }
    );

    return { data, isFetching, isLoading };
  };

  const useDeleteBulkProduct = () => {
    const mutate = useMutation(
      (payload) =>
        axiosAuth.post("/product/delete-bulk", {
          payload: [...payload],
        }),
      {
        onSuccess: (res) => {
          console.log("res", res.data.msg);
          toastSuccess(res.data.msg);

          queryClient.invalidateQueries({ queryKey: ["/product/list"] });
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastError();
          }
        },
      }
    );

    return mutate;
  };

  const useCreateProduct = () => {
    const mutate = useMutation(
      (payload) => axiosAuth.post("/product/create", payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.data.msg);

          queryClient.invalidateQueries({ queryKey: ["/product/list"] });
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastError();
          }
        },
      }
    );

    return mutate;
  };
  const useDeleteProduct = () => {
    const mutate = useMutation(
      (id) => axiosAuth.delete(`/product/${id}/delete`),
      {
        onSuccess: (res) => {
          toastSuccess(res.data.msg);

          queryClient.invalidateQueries({ queryKey: ["/product/list"] });
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastError();
          }
        },
      }
    );

    return mutate;
  };

  const useUpdateProduct = ({ id }) => {
    const mutate = useMutation(
      (payload) => axiosAuth.put(`/product/${id}/update`, payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.data.msg);

          queryClient.invalidateQueries({ queryKey: ["/product/list/detail"] });
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.msg);
          } else {
            toastError();
          }
        },
      }
    );

    return mutate;
  };
  return {
    useListProduct,
    useCreateProduct,
    useDeleteBulkProduct,
    useDetailProduct,
    useUpdateProduct,
    useDeleteProduct
  };
};

export default useProductService;
