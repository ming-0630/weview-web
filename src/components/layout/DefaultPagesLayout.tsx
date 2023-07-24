import { ToastContainer } from "react-toastify";
import LoginModal from "../templates/authentication/LoginModal";
import RegisterModal from "../templates/authentication/RegisterModal";
import NavBar from "./nav/NavBar";
import { ScriptProps } from "next/script";
import ConfirmModal from "../templates/authentication/ConfirmModal";
import { Footer, LoadingOverlay } from "@mantine/core";
import { useGlobalStore } from "@/states/globalStates";
import UploadProfilePicModal from "../templates/user/UploadProfilePicModal";
import PointsSystemModal from "../templates/user/PointsSystemModal";
import VerifyModal from "../templates/user/VerifyModal";
import ReportModal from "../templates/review/ReportModal";
import { useRouter } from "next/router";
import InspectReportModal from "../admin/templates/report/InspectReportModal";

const DefaultPageLayout = ({ children }: ScriptProps) => {
    const isLoading = useGlobalStore((state) => state.loading)

    // if ((!isLoggedIn()  && typeof window !== "undefined" && hasLoggedOut) {
    //     const router = useRouter();
    //     router.push("/")
    // }

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
            <ConfirmModal></ConfirmModal>
            <LoginModal></LoginModal>
            <RegisterModal></RegisterModal>
            <UploadProfilePicModal></UploadProfilePicModal>
            <PointsSystemModal></PointsSystemModal>
            <VerifyModal></VerifyModal>
            <ReportModal></ReportModal>
            <InspectReportModal></InspectReportModal>
            <NavBar>
                <div className='w-full bg-white !scroll-smooth'>
                    {children}
                </div>
                <Footer height={50} className="bg-main-light w-full flex justify-end px-10 items-center z-10">
                    <div className="">{'© 2023 WeView | FYP for Gun Ming Fai'}</div>
                </Footer>
            </NavBar>
        </main>

    );
}

export default DefaultPageLayout;

