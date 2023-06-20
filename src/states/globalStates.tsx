import { ConfirmModalProps } from '@/components/templates/authentication/ConfirmModal'
import { create } from 'zustand'

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    confirmIsOpen: boolean,
    confirmDetails: ConfirmModalProps,
    loading: boolean,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
    toggleConfirm: (props?: ConfirmModalProps) => void,
    loadingHandler: {
        open: () => void;
        close: () => void
    }

}

export const useGlobalStore = create<GlobalState>()((set) => (
    {
        navIsOpen: false,
        loginIsOpen: false,
        registerIsOpen: false,
        confirmIsOpen: false,
        confirmDetails: {},
        loading: false,
        toggleNav: () => set((state) => ({ navIsOpen: !state.navIsOpen })),
        toggleLogin: () => set((state) => ({ loginIsOpen: !state.loginIsOpen })),
        toggleRegister: () => set((state) => ({ registerIsOpen: !state.registerIsOpen })),
        toggleConfirm: (confirmDetails?) => {
            set((state) => ({
                ...state,
                confirmIsOpen: !state.confirmIsOpen,
                confirmDetails: !state.confirmIsOpen ? confirmDetails : state.confirmDetails
            }))
        },
        loadingHandler: {
            open: () => set({ loading: true }),
            close: () => set({ loading: false })
        }
    }))

