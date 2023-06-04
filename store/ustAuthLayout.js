import useAxiosAuth from "@/hook/useAxiosAuth";
import { create } from "zustand";
import { useSession } from "next-auth/react";
import useAuthService from "@/service/profileServices";

const useAuthLayout = create((set) => ({
  menu: false,
  minimize: false,
  setMinimize: () => {
    set((state) => ({
      minimize: !state.minimize,
    }));
  },
  setMenu: () =>
    set((state) => ({
      menu: !state.menu,
    })),
}));

export default useAuthLayout;
