import { create } from 'zustand';

type LoadingPerfumeTypes = {
    loadingPerfume: boolean,
    setLoadingPerfume: (newState: boolean) => void
}

const useLoadingPerfume = create<LoadingPerfumeTypes>((set) => ({
    loadingPerfume: true,
    setLoadingPerfume: (newState) => set({ loadingPerfume: newState })
}))

export default useLoadingPerfume;