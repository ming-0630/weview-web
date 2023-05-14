import { ToastContainer } from "react-toastify";
import LoginModal from "../templates/authentication/LoginModal";
import RegisterModal from "../templates/authentication/RegisterModal";
import NavBar from "./nav/NavBar";
import { ScriptProps } from "next/script";

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
            <LoginModal></LoginModal>
            <RegisterModal></RegisterModal>
            <NavBar>
                <div className='w-full bg-white'>
                    {children}
                </div>
            </NavBar>
        </main>

    );
}

export default DefaultPageLayout;
