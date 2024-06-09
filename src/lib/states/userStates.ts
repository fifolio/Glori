import { create } from 'zustand';

type UserState = {
    isLoggedin: boolean | undefined,
    setIsLoggedin: (state: boolean) => void
}

const useUserState = create<UserState>((set) => ({
    isLoggedin: undefined,
    setIsLoggedin: (state) => set({ isLoggedin: state })
}))

export default useUserState;