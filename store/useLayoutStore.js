import { create } from "zustand";

const useLayoutStore = create((set) => ({
  menu: false,
  minimize: false,
  count : 0,
  setMinimize: () => {
    set((state) => ({
      minimize: !state.minimize,
    //   menu : true,
    //   count : count + 1
    }));
  },

  setMenu: () => {
    set((state) => ({
      menu: !state.menu,
    }));
  },
}));

export default useLayoutStore;
