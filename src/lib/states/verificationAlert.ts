import { create } from 'zustand';

type VerificationAlert = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}

const useVerificationAlertState = create<VerificationAlert>((set) => ({
    isOpen: false,
    setIsOpen: (state) => set({ isOpen: state })
}))

export default useVerificationAlertState;