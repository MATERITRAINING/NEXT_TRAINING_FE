"use client";
import { axiosAuth } from "../service/axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";


const useAxiosAuth = () => {
  const { data: session } = useSession();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );


    const responseIntercept = axiosAuth.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (401 === error?.response?.status && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
           
            await refreshToken()
            prevRequest.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
            return axiosAuth(prevRequest);
          
            
          } catch (err) {

            console.log(err)
            signOut();
            window.location.replace("/auth/login");
            if (err.response.status === 401) {
            } else {
              signOut();
              window.location.replace("/auth/login");
            }
           
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
