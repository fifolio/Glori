import { create } from 'zustand';

type joinFormType = {
    formType: string,
    setFormType: (state: string) => void
}

const useJoinFormType = create<joinFormType>((set) => ({
    formType: 'login',
    setFormType: (state) => set({ formType: state })
}))

export default useJoinFormType;

