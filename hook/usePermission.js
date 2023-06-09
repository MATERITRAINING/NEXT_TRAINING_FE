import useAxiosAuth from "./useAuthAxios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAuthStore from "@/store/useAuthStore";
const usePermission = () => {
  const { data: session, update } = useSession();
  const axiosClient = useAxiosAuth();
  const  setPermissionUser = useAuthStore((state) => state.setPermissionUser)

  const { data } = useQuery(
    ["permission"],
    () => axiosClient.get("permission"),
    {
      enabled: session?.user?.accessToken !== undefined,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60,
      select: (response) => response.data,
      onSuccess: async (data) => {

        setPermissionUser(data)
       
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

  return { data };
};

export default usePermission;
