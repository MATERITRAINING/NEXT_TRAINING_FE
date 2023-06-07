import useAxiosAuth from "./useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAuthStore from "@/store/useAuthStore";

const usePermission = () => {
  const { data: session, update } = useSession();
  const axiosAuth = useAxiosAuth();
  const setPermissionUser = useAuthStore((state) => state.setPermissionUser);

  const { data, isFetching, isLoading } = useQuery(
    ["/permission"],
    () => axiosAuth.get("/permission"),
    {
      enabled: session?.user?.accessToken !== undefined,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, //3 s
      refetchInterval: 1000 * 60 * 60,

      select: (response) => response.data,
      onSuccess: async (data) => {

        console.log('data', data)
       
        setPermissionUser(data);

        await update({
          ...session,
          user: {
            ...session.user,
            permissions: data.permissions,
          },
        });
      },
    }
  );

  return { data, isFetching, isLoading };
};

export default usePermission;
