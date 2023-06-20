import { ToastContainer } from "react-toastify";
import LoginModal from "../templates/authentication/LoginModal";
import RegisterModal from "../templates/authentication/RegisterModal";
import NavBar from "./nav/NavBar";
import { ScriptProps } from "next/script";
import ConfirmModal from "../templates/authentication/ConfirmModal";
import { LoadingOverlay } from "@mantine/core";
import { useGlobalStore } from "@/states/globalStates";

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
            <NavBar>
                <div className='w-full bg-white !scroll-smooth'>
                    {children}
                </div>
            </NavBar>
        </main>

    );
}

export default DefaultPageLayout;
