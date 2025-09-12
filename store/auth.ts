import { create } from "zustand";

export const useStore = create((set) => ({
  profile: null,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setProfile: (profile: any) => set({ profile }),
}));
