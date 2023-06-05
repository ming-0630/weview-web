import { ToastContainer } from "react-toastify";
import LoginModal from "../templates/authentication/LoginModal";
import RegisterModal from "../templates/authentication/RegisterModal";
import NavBar from "./nav/NavBar";
import { ScriptProps } from "next/script";
import ConfirmModal from "../templates/authentication/ConfirmModal";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        palette: {
            primary: {
                main: string;
                contrastText: string;
            };
        },
        typography: {
            fontFamily: string;
        }

    }
}
const theme = createTheme({
    palette: {
        primary: {
            main: '#40AF93',
            contrastText: '#FFFFFF'
        }
    }, typography: {
        fontFamily: 'Rubik',
    },
});

const DefaultPageLayout = ({ children }: ScriptProps) => {
    return (
        <main
            className='flex min-h-screen flex-col items-center justify-between font-sans text-black'>
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
            <ThemeProvider theme={theme}>
                <ConfirmModal></ConfirmModal>
                <LoginModal></LoginModal>
                <RegisterModal></RegisterModal>
                <NavBar>
                    <div className='w-full bg-white !scroll-smooth'>
                        {children}
                    </div>
                </NavBar>
            </ThemeProvider>

        </main>

    );
}

export default DefaultPageLayout;
