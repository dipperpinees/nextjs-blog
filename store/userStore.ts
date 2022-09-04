import create from "zustand";
import { IUser } from "../lib/type";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void
}

const userStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: IUser | null) => {
        set({user})
    }
}));

export default userStore;
