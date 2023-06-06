import useAxiosAuth from "../hook/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAuthStore from "@/store/useAuthStore";

const usePermission = () => {
  const axiosAuth = useAxiosAuth();
  const setPermissionUser = useAuthStore((state) => state.setPermissionUser);
  const { data: session } = useSession();
  const { data, isFetching, isLoading } = useQuery(
    ["/permission"],
    () => axiosAuth.get("/permission"),
    {
      enabled: session?.user?.accessToken !== undefined,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, //3 s
      refetchInterval: 1000 * 60 * 60,

      select: (response) => response.data,
      onSuccess : (data) => {
        console.log('nerjal', data)
        setPermissionUser(data)
      }

    }
  );

  return { data, isFetching, isLoading };
};

export default usePermission;
