import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/hook/useAuthAxios";
import useNotification from "@/hook/useNotification";
import { useSession } from "next-auth/react";
export default function useProductService() {
  const axiosClient = useAxiosAuth();
  const { toastSuccess, toastWarning, toastDanger } = useNotification();
  const { data: session } = useSession();
  const useListProduct = (defaultParams) => {
    
    const [params, setParams] = useState({
      page: 1,
      pageSize: 10,
      q : "",
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

  return { useListProduct };
}
