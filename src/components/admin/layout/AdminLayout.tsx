import { useGlobalStore } from "@/states/globalStates";
import { LoadingOverlay } from "@mantine/core";
import { ScriptProps } from "next/script";
import { ToastContainer } from "react-toastify";
import AdminNavBar from "./nav/AdminNavBar";
import NewRewardModal from "../templates/NewRewardModal";

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
            <NewRewardModal></NewRewardModal>
            <LoadingOverlay visible={isLoading} overlayBlur={2} className="h-screen fixed w-full" />
            <AdminNavBar>{children}</AdminNavBar>
        </main>

    );
}

export default DefaultPageLayout;
