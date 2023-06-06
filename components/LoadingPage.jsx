/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import usePermission from "@/service/usePermission";
import useAuthStore from "@/store/useAuthStore";

const LoadingPage = ({ children }) => {
  const { data: session, status } = useSession();
  const { data, isFetching } = usePermission();
 
  const user = useAuthStore((state) => state.user);

  usePermission()

  if(status === 'loading') {
    return <Spinner/>
  }
  console.log('user', user)

  console.log('session', session)
  return <>{children}</>;
};

export default LoadingPage;
