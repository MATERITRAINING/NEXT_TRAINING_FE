import { create } from "zustand";


const useAuthStore = create((set) => ({
  user: {},
  loading: false,
  setPermissionUser: (newUser) => {

    console.log('new', newUser)
    
    set((state) => ({
      user: {
        email: newUser.user.email,
        name: newUser.user.id,
        permissions: newUser.permissions,
       
      },

     
    }));
  },
  count: 0,
  setIncrement: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

export default useAuthStore;
