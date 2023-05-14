import { create } from 'zustand'

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
}

export const useGlobalStore = create<GlobalState>()((set) => ({
    navIsOpen: false,
    loginIsOpen: false,
    registerIsOpen: false,
    toggleNav: () => set((state) => ({ navIsOpen: !state.navIsOpen })),
    toggleLogin: () => set((state) => ({ loginIsOpen: !state.loginIsOpen })),
    toggleRegister: () => set((state) => ({ registerIsOpen: !state.registerIsOpen })),
}))

