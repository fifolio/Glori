import { create } from 'zustand';

type UserIdTypes = {
    loggedinUserId: string;
    setLoggedinUserId: (state: string) => void
}

const useUserId = create<UserIdTypes>((set) => ({
    loggedinUserId: '',
    setLoggedinUserId: (state) => set({ loggedinUserId: state })
}))

export default useUserId;