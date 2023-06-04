import useAxiosAuth from "../hook/useAxiosAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import useNotification from "../hook/useNotification";
import useStore from "@/store/useAuthStore";

const useAuthService = () => {
  const axiosAuth = useAxiosAuth();
  const store = useStore();
  const queryClient = useQueryClient();
  const setUser = useStore((state) => state.setUser);
 

  const { toastSuccess, toastError, toastWarning } = useNotification();

  const { data: session } = useSession();

  const getUserProfile = () => {
    return axiosAuth.get("/profile");
  };

  const useProfileList = (defaultPrams) => {
    const [params, setParams] = useState({
      pageSize: 10,
      page: 1,
      ...defaultPrams,
    });

    const { data, isFetching, isLoading } = useQuery(
      ["/profile"],
      () => axiosAuth.get("/profile"),
      {
        enabled: session?.user?.accessToken !== undefined,
        // staleTime: 3000, //3 s
        // refetchInterval: 5000,
        keepPreviousData: true,
        select: (response) => {
          console.log("profle fetch berjalan");
          return response.data;
          z;
        },

        onSuccess: (res) => {
          console.log("res data", res);
          setUser(res.data);
        },
      }
    );

    return { data, isFetching, isLoading, params, setParams };
  };

  return {
    useProfileList,
    getUserProfile,
  };
};

export default useAuthService;
