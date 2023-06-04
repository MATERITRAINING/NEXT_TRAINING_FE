/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useAuthService from "@/service/profileServices";
import { useCallback, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const LoadingPage = ({ children }) => {
  const { data: session, status } = useSession();
  const { getUserProfile } = useAuthService();
  const setProfileUser = useAuthStore((state) => state.setProfileUser);

  const handleAuth = useCallback(async () => {
    if (session) {
      const res = await getUserProfile();
      setProfileUser(res.data);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      handleAuth();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default LoadingPage;
