import { ConfirmModalProps } from '@/components/templates/authentication/ConfirmModal'
import { create } from 'zustand'

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    confirmIsOpen: boolean,
    confirmDetails: ConfirmModalProps,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
    // toggleConfirm: (onClickYes?: (...args: any[]) => void) => void,
    toggleConfirm: (props?: ConfirmModalProps) => void,
    // modalIsOpen: () => boolean
}

export const useGlobalStore = create<GlobalState>()((set) => (
    {
        navIsOpen: false,
        loginIsOpen: false,
        registerIsOpen: false,
        confirmIsOpen: false,
        confirmDetails: {},
        nav2isOpen: false,
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
        // modalIsOpen: () => {

        //     return false;
        // }
    }))

