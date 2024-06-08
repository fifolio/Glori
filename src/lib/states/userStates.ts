import { create } from 'zustand';

type UserState = {
    isLoggedin: boolean,
    setIsLoggedin: (state: boolean) => void
}

const useUserState = create<UserState>((set) => ({
    isLoggedin: false,
    setIsLoggedin: (state) => set({ isLoggedin: state })
}))

export default useUserState;