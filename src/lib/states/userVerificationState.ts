import { create } from 'zustand'

type UserVerificationState = {
    isVerified: boolean;
    setIsVerified: (state: boolean) => void;
}

const useUserVerificationState = create<UserVerificationState>((set) => ({
    isVerified: false,
    setIsVerified: (state) => set({ isVerified: state })
}));

export default useUserVerificationState;