import { create } from 'zustand';

type ErrorAlert = {
    // Signup
    showSignupAlert: boolean,
    setShowSignupAlert: (state: boolean) => void,

    // Login
    showLoginAlert: boolean,
    setShowLoginAlert: (state: boolean) => void
}


const useErrorAlert = create<ErrorAlert>((set) => ({
    // Signup
    showSignupAlert: false,
    setShowSignupAlert: (state) => set({ showSignupAlert: state }),

    // Login
    showLoginAlert: false,
    setShowLoginAlert: (state) => set({ showLoginAlert: state }),
}))

export default useErrorAlert;