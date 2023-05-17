import { create } from 'zustand'

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    logoutIsOpen: boolean,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
    toggleLogout: (onClickYes?: (...args: any[]) => void) => void,
}

export const useGlobalStore = create<GlobalState>()((set) => ({
    navIsOpen: false,
    loginIsOpen: false,
    registerIsOpen: false,
    logoutIsOpen: false,
    toggleNav: () => set((state) => ({ navIsOpen: !state.navIsOpen })),
    toggleLogin: () => set((state) => ({ loginIsOpen: !state.loginIsOpen })),
    toggleRegister: () => set((state) => ({ registerIsOpen: !state.registerIsOpen })),
    toggleLogout: (onClickYes) => {
        set((state) => ({ logoutIsOpen: !state.logoutIsOpen }));
        onClickYes && onClickYes();
    },
}))

