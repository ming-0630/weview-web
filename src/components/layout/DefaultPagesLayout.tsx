import LoginModal from "../templates/login/LoginModal";
import NavBar from "./nav/NavBar";
import { ScriptProps } from "next/script";

const DefaultPageLayout = ({ children }: ScriptProps) => {

    return (
        <main
            className='flex min-h-screen flex-col items-center justify-between font-sans text-black'>
            <LoginModal></LoginModal>
            <NavBar>
                <div className='w-full bg-white'>
                    {children}
                </div>
            </NavBar>
        </main>

    );
}

export default DefaultPageLayout;
