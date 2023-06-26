import { ConfirmModalProps } from '@/components/templates/authentication/ConfirmModal'
import { Reward } from '@/interfaces/rewardInterface';
import { create } from 'zustand'

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    confirmIsOpen: boolean,
    uploadIsOpen: boolean,
    pointsIsOpen: boolean,
    verifyIsOpen: boolean,
    newRewardIsOpen: boolean,
    editRewardIsOpen: boolean,
    editCodeIsOpen: boolean,
    confirmDetails: ConfirmModalProps,
    loading: boolean,
    editingReward?: Reward,
    refreshFunction?: (...args: any[]) => void,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
    toggleUpload: () => void,
    togglePoints: () => void,
    toggleVerify: () => void,
    toggleConfirm: (props?: ConfirmModalProps) => void,
    toggleNewRewardIsOpen: (refreshFunction?: (...args: any[]) => void) => void,
    toggleEditRewardIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => void,
    toggleEditCodeIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => void,
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
        uploadIsOpen: false,
        pointsIsOpen: false,
        verifyIsOpen: false,
        newRewardIsOpen: false,
        editRewardIsOpen: false,
        editCodeIsOpen: false,
        confirmDetails: {},
        loading: false,
        editingReward: undefined,
        refreshFunction: undefined,
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
        toggleUpload: () => set((state) => ({ uploadIsOpen: !state.uploadIsOpen })),
        togglePoints: () => set((state) => ({ pointsIsOpen: !state.pointsIsOpen })),
        toggleVerify: () => set((state) => ({ verifyIsOpen: !state.verifyIsOpen })),
        toggleNewRewardIsOpen: (refreshFunction?: (...args: any[]) => void) => set((state) => ({
            newRewardIsOpen: !state.newRewardIsOpen,
            refreshFunction: (state.newRewardIsOpen && refreshFunction) ? undefined : refreshFunction
        })),
        toggleEditRewardIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            editRewardIsOpen: !state.editRewardIsOpen,
            editingReward: state.editRewardIsOpen || !reward ? undefined : reward,
            refreshFunction: state.editRewardIsOpen || !reward ? undefined : refreshFunction
        })),
        toggleEditCodeIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            editCodeIsOpen: !state.editCodeIsOpen,
            editingReward: state.editCodeIsOpen || !reward ? undefined : reward,
            refreshFunction: state.editCodeIsOpen || !reward ? undefined : refreshFunction
        })),
        loadingHandler: {
            open: () => set({ loading: true }),
            close: () => set({ loading: false })
        }
    }))

