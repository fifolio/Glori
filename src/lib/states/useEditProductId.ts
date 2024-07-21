import { create } from 'zustand';

type EditProductId = {
    editProductId: string;
    setEditProductId: (id: string) => void;
}

const useEditProduct = create<EditProductId>((set) => ({
    editProductId: '',
    setEditProductId: (id) => set({ editProductId: id })
}))

export default useEditProduct;