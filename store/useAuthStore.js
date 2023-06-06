import useAxiosAuth from "@/hook/useAxiosAuth";
import { create } from "zustand";
import { useSession } from "next-auth/react";
import useAuthService from "@/service/usePermission";

const useAuthStore = create((set) => ({
  user: {},
  role: [],
  loading: false,
  setPermissionUser: (newUser) => {
    
    set((state) => ({
      user: {
        email: newUser.user.email,
        name: newUser.user.id,
        role: newUser.user.role,
      },

      permission: newUser.permissions,
    }));
  },
  count: 0,
  setIncrement: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

export default useAuthStore;
