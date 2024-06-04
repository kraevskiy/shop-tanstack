import { create } from "zustand";
import { IUser } from "@/types/user.interface.ts";

export type UserData = {
  user: IUser | null;
};
export type UserActions = {
  logIn: (user: IUser) => void;
  logOut: () => void;
};

export const useUserStore = create<UserData & UserActions>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));
