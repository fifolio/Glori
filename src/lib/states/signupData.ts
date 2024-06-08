import { create } from 'zustand';

type SignupData = {
    email: string,
    password: string,
    username: string,
    setEmail: (state: string) => void,
    setPassword: (state: string) => void,
    setUsername: (state: string) => void,
}

const useSignupData = create<SignupData>((set) => ({
    email: '',
    password: '',
    username: '',
    setEmail: (state) => set({ email: state }),
    setPassword: (state) => set({ password: state }),
    setUsername: (state) => set({ username: state }),
}))

export default useSignupData;