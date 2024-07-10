import { create } from 'zustand';

type IsLikedTypes = {
    isLiked: boolean | undefined;
    setIsLiked: (newState: boolean) => void
}

const useIsLiked = create<IsLikedTypes>((set) => ({
    isLiked: undefined,
    setIsLiked: (newState) => set({ isLiked: newState })
}))

export default useIsLiked;