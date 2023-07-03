import { useGlobalStore } from "@/states/globalStates";
import { LoadingOverlay } from "@mantine/core";
import { ScriptProps } from "next/script";
import { ToastContainer } from "react-toastify";
import AdminNavBar from "./nav/AdminNavBar";
import InspectReportModal from "../templates/report/InspectReportModal";
import InspectReviewModal from "../templates/report/InspectReviewModal";
import EditCodeModal from "../templates/reward/EditCodeModal";
import EditRewardModal from "../templates/reward/EditRewardModal";
import NewRewardModal from "../templates/reward/NewRewardModal";
import EditProductModal from "../templates/product/EditProductModal";
import NewProductModal from "../templates/product/NewProductModal";

const DefaultPageLayout = ({ children }: ScriptProps) => {
    const isLoading = useGlobalStore((state) => state.loading)

    return (
        <main
            className='flex flex-col items-center justify-between font-sans text-black relative'>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <LoadingOverlay visible={isLoading} overlayBlur={2} className="h-screen fixed w-full" />
            <NewRewardModal></NewRewardModal>
            <EditRewardModal></EditRewardModal>
            <EditCodeModal></EditCodeModal>
            <NewProductModal></NewProductModal>
            <EditProductModal></EditProductModal>
            <InspectReviewModal></InspectReviewModal>
            <InspectReportModal></InspectReportModal>
            <AdminNavBar>{children}</AdminNavBar>
        </main>

    );
}

export default DefaultPageLayout;
