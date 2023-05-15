import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { ReactNode, useState } from "react";
import { useGlobalStore } from "@/states/global-states";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import PasswordInput from "@/components/ui/PasswordInput";
import { LoginDto, login } from "@/services/user/services";
import { toast } from "react-toastify";
import { AuthTokens, useAuthStore } from "@/states/auth-states";

export interface LoginModalProps {
    children?: ReactNode;
}

const LoginModal = (props: LoginModalProps) => {
    const isShow = useGlobalStore((state) => state.loginIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleLogin)
    const toggleRegister = useGlobalStore((state) => state.toggleRegister)

    const register = () => {
        toggleModal();
        toggleRegister();
    }

    const [loginValues, setLoginValues] = useState<LoginDto>()

    const clientLogin = useAuthStore((state) => state.login)

    const handleLogin = async () => {
        if (loginValues?.email && loginValues?.password) {
            const response = await login(loginValues);
            const tokens: AuthTokens = response?.data;
            clientLogin(tokens)
        } else {
            toast.error("Empty Fields!")
        }
        console.log(localStorage.getItem("accessToken"))
    }

    return (
        <Modal isShow={isShow}
            toggleModal={toggleModal}
        >
            <div className="p-5 w-[30vw]">
                <div className="flex items-center">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">Login</div>
                </div>

                <div className="pt-5">
                    <div className="flex flex-col">
                        <label className="mb-1">Email</label>
                        <input type="text" placeholder="Email" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                            value={loginValues?.email}
                            onChange={(e) => { setLoginValues({ ...loginValues, email: e.target.value }) }} />
                    </div>

                    <div>
                        <PasswordInput classnames="mt-5"
                            value={loginValues?.password}
                            onChange={(e) => { setLoginValues({ ...loginValues, password: e.target.value }) }}></PasswordInput>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <label className="cursor-pointer text-black/50 text-sm hover:text-main" onClick={register}>Don't have an account? Click here!</label>

                        <label className='btn btn-primary mr-4 text-white'
                            onClick={handleLogin}>Login</label>

                    </div>
                </div>

            </div>
        </Modal >
    )
}

export default LoginModal 
