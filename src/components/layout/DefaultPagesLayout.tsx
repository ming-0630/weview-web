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

// declare module '@mui/material/styles' {
//     interface Theme {
//         palette: {
//             primary: {
//                 main: string;
//                 contrastText: string;
//             },
//             secondary: {
//                 main: string;
//             }
//         },
//         typography: {
//             fontFamily: string;
//         }

//     }
// }
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#40AF93',
//             contrastText: '#FFFFFF'
//         }
//     }, typography: {
//         fontFamily: 'Rubik',
//     },
// });

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
            <ConfirmModal></ConfirmModal>
            <LoginModal></LoginModal>
            <RegisterModal></RegisterModal>
            <UploadProfilePicModal></UploadProfilePicModal>
            <PointsSystemModal></PointsSystemModal>
            <VerifyModal></VerifyModal>
            <NavBar>
                <div className='w-full bg-white !scroll-smooth'>
                    {children}
                </div>
                <Footer height={50} className="bg-main-light w-full flex justify-end px-10 items-center">
                    <div className="">{'© 2023 WeView | FYP for Gun Ming Fai'}</div>
                </Footer>
            </NavBar>
        </main>

    );
}

export default DefaultPageLayout;
