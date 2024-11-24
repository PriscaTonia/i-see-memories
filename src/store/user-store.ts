import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserState = {
  userId: string;
};

export type UserActions = {
  setUserId: (id: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userId: "",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      }),
      { name: "user-store" } // Key for localStorage
    )
  );
};
