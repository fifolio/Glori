import { create } from 'zustand';

type CheckStoreState = {
    isStoreValid: boolean;
    setIsStoreValid: (state: boolean) => void;
}

const useCheckStoreState = create<CheckStoreState>((set) => ({
    isStoreValid: false,
    setIsStoreValid: (state) => set({ isStoreValid: state })
}))

export default useCheckStoreState;