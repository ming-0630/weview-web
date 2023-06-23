// import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import PasswordInput from "@/components/ui/PasswordInput";
import User from "@/interfaces/userInterface";
import { LoginDto, login } from "@/services/user/services";
import { AuthTokens, useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { base64StringToBlob } from "blob-util";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WeViewLogo from '/public/favicon.ico';

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

    const { setTokens } = useAuthStore()
    const { setCurrentUser } = useAuthStore()

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
                    username: data.user.username,
                    userImageBase64: data.user.userImage,
                    isVerified: data.user.isVerified,
                    points: data.user.points
                }

                if (data.user && data.user.userImage) {
                    const blob = base64StringToBlob(data.user.userImage);
                    const img = URL.createObjectURL(blob);
                    user.userImage = img
                }

                setTokens(tokens);
                setCurrentUser(user);
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
                            onClick={register}>{"Don't have an account? Click here!"}</label>

                        <Button className="mt-3 bg-main" variant='filled'
                            onClick={handleLogin}
                        >Login</Button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default LoginModal 
