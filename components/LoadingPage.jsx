/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import usePermission from "@/hook/usePermission";

const LoadingPage = ({ children }) => {
  const { data: session, status } = useSession();

  usePermission();

  if (status === "loading") {
    return <div className="h-screen w-screen flex items-center justify-center">
      <Center><Spinner/></Center>
    </div>
  }

  return <>{children}</>;
};

export default LoadingPage;
