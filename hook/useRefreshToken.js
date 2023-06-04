"use client";

import { axiosAuth } from "../service/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axiosAuth.post("/refresh-token", {
      refreshToken: session?.user.refreshToken,
      id: session?.user.id,
    });

    console.log("res", res.data);

    await update({
      ...session,
      user: {
        ...session.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      },
    });
    // session.user.accessToken = res.data.accessToken;
    // session.user.refreshToken = res.data.refreshToken;
    // session.user.name = res.data.user.name;
    // (session.user.role = res.data.user.role),
    //   (session.user.id = res.data.user.id);
  };
  return { refreshToken };
};
