import { create } from "zustand";
import { IUser } from "@/types/user.interface.ts";
import { ELocalStorage } from "@/types/local-storage-enum.ts";

export type UserData = {
  user: IUser | null;
  isInitialLoading: boolean;
};
export type UserActions = {
  logIn: (user: IUser) => void;
  logOut: () => void;
  getUser: () => Promise<void>;
};
export const useUserStore = create<UserData & UserActions>((set) => ({
  user: null,
  isInitialLoading: true,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
  getUser: async () => {
    const token = localStorage.getItem(ELocalStorage.token);
    if (!token) {
      set({ isInitialLoading: false });
      return;
    }
    await fetch("/api-dummy/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const result = await res.json();
      if (res.status === 401) {
        set({ isInitialLoading: false });
      } else {
        set({ user: result, isInitialLoading: false });
      }
    }).catch(e => {
      console.log(e);
      set({ isInitialLoading: false });
    });
  },
}));
