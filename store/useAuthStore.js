import useAxiosAuth from "@/hook/useAxiosAuth";
import { create } from "zustand";
import { useSession } from "next-auth/react";
import useAuthService from "@/service/profileServices";

const useAuthStore = create((set) => ({
  user: {},
  role: [],
  loading: false,
  setProfileUser: (newUser) => {
    console.log("new", newUser);
    set((state) => ({
      user: {
        email: newUser.user.email,
        name: newUser.user.id,
        role: newUser.user.role,
      },

      role: newUser.permission,
    }));
  },
  count: 0,
  setIncrement: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

export default useAuthStore;
