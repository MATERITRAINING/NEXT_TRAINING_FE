import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {},
  setPermissionUser: (newUser) => {
    set(() => ({
      user: {
        email: newUser.user.email,
        id: newUser.user.id,
        name: newUser.user.name,
        permissions: newUser.permissions,
      },
    }));
  },
}));


export default useAuthStore
