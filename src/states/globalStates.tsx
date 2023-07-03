import { ConfirmModalProps } from '@/components/templates/authentication/ConfirmModal';
import Report from '@/interfaces/reportInterface';
import Review from '@/interfaces/reviewInterface';
import { Reward } from '@/interfaces/rewardInterface';
import { create } from 'zustand';

export interface GlobalState {
    navIsOpen: boolean,
    loginIsOpen: boolean,
    registerIsOpen: boolean,
    confirmIsOpen: boolean,
    uploadIsOpen: boolean,
    pointsIsOpen: boolean,
    verifyIsOpen: boolean,
    reportIsOpen: boolean,
    newRewardIsOpen: boolean,
    editRewardIsOpen: boolean,
    editCodeIsOpen: boolean,
    newProductIsOpen: boolean,
    editProductIsOpen: boolean,
    inspectReviewIsOpen: boolean,
    inspectReportIsOpen: boolean,
    confirmDetails: ConfirmModalProps,
    loading: boolean,
    editingReward?: Reward,
    editingProductId?: string,
    reportingReviewId?: string,
    inspectingReview?: Review,
    inspectingReport?: Report,
    refreshFunction?: (...args: any[]) => void,
    toggleNav: () => void,
    toggleLogin: () => void,
    toggleRegister: () => void,
    toggleUpload: () => void,
    togglePoints: () => void,
    toggleVerify: () => void,
    toggleReport: (reportingReviewId?: string) => void,
    toggleConfirm: (props?: ConfirmModalProps) => void,
    toggleNewRewardIsOpen: (refreshFunction?: (...args: any[]) => void) => void,
    toggleEditRewardIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => void,
    toggleNewProductIsOpen: (refreshFunction?: (...args: any[]) => void) => void,
    toggleEditProductIsOpen: (productId?: string, refreshFunction?: (...args: any[]) => void) => void,
    toggleEditCodeIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => void,
    toggleInspectReview: (review?: Review) => void,
    toggleInspectReport: (report?: Report, refreshFunction?: (...args: any[]) => void) => void,
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
        reportIsOpen: false,
        newRewardIsOpen: false,
        editRewardIsOpen: false,
        newProductIsOpen: false,
        editProductIsOpen: false,
        editCodeIsOpen: false,
        inspectReviewIsOpen: false,
        inspectReportIsOpen: false,
        confirmDetails: {},
        loading: false,
        editingReward: undefined,
        editingProductId: undefined,
        reportingReviewId: undefined,
        inspectReview: undefined,
        inspectReport: undefined,
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
        toggleReport: (reportingReviewId?: string) => {
            set((state) => ({
                reportIsOpen: !state.reportIsOpen,
                reportingReviewId: state.reportIsOpen ? undefined : reportingReviewId
            }))
        },
        toggleNewRewardIsOpen: (refreshFunction?: (...args: any[]) => void) => set((state) => ({
            newRewardIsOpen: !state.newRewardIsOpen,
            refreshFunction: (state.newRewardIsOpen && refreshFunction) ? undefined : refreshFunction
        })),
        toggleEditRewardIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            editRewardIsOpen: !state.editRewardIsOpen,
            editingReward: state.editRewardIsOpen || !reward ? undefined : reward,
            refreshFunction: state.editRewardIsOpen || !reward ? undefined : refreshFunction
        })),
        toggleNewProductIsOpen: (refreshFunction?: (...args: any[]) => void) => set((state) => ({
            newProductIsOpen: !state.newProductIsOpen,
            refreshFunction: (state.newProductIsOpen && refreshFunction) ? undefined : refreshFunction
        })),
        toggleEditProductIsOpen: (productId?: string, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            editProductIsOpen: !state.editProductIsOpen,
            editingProductId: state.editProductIsOpen || !productId ? undefined : productId,
            refreshFunction: state.editProductIsOpen || !productId ? undefined : refreshFunction
        })),
        toggleEditCodeIsOpen: (reward?: Reward, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            editCodeIsOpen: !state.editCodeIsOpen,
            editingReward: state.editCodeIsOpen || !reward ? undefined : reward,
            refreshFunction: state.editCodeIsOpen || !reward ? undefined : refreshFunction
        })),
        toggleInspectReview: (review?: Review) => set((state) => ({
            inspectReviewIsOpen: !state.inspectReviewIsOpen,
            inspectingReview: state.inspectReviewIsOpen || !review ? undefined : review,
        })),
        toggleInspectReport: (report?: Report, refreshFunction?: (...args: any[]) => void) => set((state) => ({
            inspectReportIsOpen: !state.inspectReportIsOpen,
            inspectingReport: state.inspectReportIsOpen || !report ? undefined : report,
            refreshFunction: (state.inspectReportIsOpen && refreshFunction) ? undefined : refreshFunction
        })),
        loadingHandler: {
            open: () => set({ loading: true }),
            close: () => set({ loading: false })
        }
    }))

