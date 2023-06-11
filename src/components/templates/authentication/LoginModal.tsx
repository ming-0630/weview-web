import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/states/globalStates";
import PasswordInput from "@/components/ui/PasswordInput";
import { LoginDto, login } from "@/services/user/services";
import { toast } from "react-toastify";
import { AuthTokens, useAuthStore } from "@/states/authStates";
import User from "@/interfaces/userInterface";
import CustomToastError from "@/utils/CustomToastError";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay } from "@mantine/core";
import { Button } from "@/components/ui/Button";

const LoginModal = () => {
    const isShow = useGlobalStore((state) => state.loginIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleLogin)
    const toggleRegister = useGlobalStore((state) => state.toggleRegister)

    const [isLoading, loadingHandler] = useDisclosure(false);

    const register = (e: any) => {
        if (!isLoading) {
            toggleModal();
            toggleRegister();
        } else {
            e.stopPropagation();
        }
    }

    const [loginValues, setLoginValues] = useState<LoginDto>({ email: "", password: "" })

    const clientLogin = useAuthStore((state) => state.login)

    const handleLogin = async () => {
        loadingHandler.open();
        if (isPopulated()) {
            const response = await login(loginValues!);
            if (response &&
                response.status === 200 &&
                response.data) {

                const data = response.data;

                const tokens: AuthTokens = {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                }
                const user: User = {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.username,
                    roles: data.user.roles,
                    userImage: data.userImage
                }
                clientLogin(tokens, user);
                toast.success("Login Successful!");
                toggleModal();
            }
        }
        loadingHandler.close();
    }

    const isPopulated = () => {
        if (loginValues?.email && loginValues?.password) {
            return true;
        } else {
            CustomToastError("Empty Fields!");
            return false;
        }
    }

    useEffect(() => {
        if (!isShow) {
            setLoginValues({ email: "", password: "" })
        }
    }, [isShow])

    return (
        <Modal isShow={isShow}
            isLoading={isLoading}
            toggleModal={toggleModal}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="p-5 w-[70vw] sm:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
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
                            onChange={(e) => { setLoginValues({ ...loginValues, email: e.target.value }) }}
                            disabled={isLoading} />
                    </div>

                    <div>
                        <PasswordInput classnames="mt-5"
                            value={loginValues?.password}
                            onChange={(e) => { setLoginValues({ ...loginValues, password: e.target.value }) }}
                            disabled={isLoading}
                        ></PasswordInput>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <label className="cursor-pointer text-black/50 text-sm hover:text-main"
                            onClick={register}>Don't have an account? Click here!</label>

                        <Button onClick={handleLogin}>Login</Button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default LoginModal 
