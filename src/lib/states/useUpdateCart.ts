import { create } from 'zustand'

type UpdateCartStateTypes = {
    cartState: boolean;
    setCartState: (state: boolean) => void;
}

const useUpdateCart = create<UpdateCartStateTypes>((set) => ({
    cartState: false,
    setCartState: (state) => set({ cartState: state })
}))

export default useUpdateCart;