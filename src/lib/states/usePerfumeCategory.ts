import { create } from 'zustand'

type PerfumeCategoryType = {
    category: string;
    setCategory: (newCategory: string) => void;
}

const usePerfumeCategory = create<PerfumeCategoryType>((set) => ({
    category: '',
    setCategory: (newCategory) => set({ category: newCategory })
}));

export default usePerfumeCategory;