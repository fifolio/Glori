import {create} from 'zustand';

type IsSettingsCustomDialogOpenTypes = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void
}

const useIsSettingsCustomDialogOpen = create<IsSettingsCustomDialogOpenTypes>((set) => ({
    isOpen: false,
    setIsOpen: (state) => set({isOpen: state})
}))

export default useIsSettingsCustomDialogOpen;