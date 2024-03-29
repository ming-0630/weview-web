import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/states/globalStates";
import registerImage from '../../../assets/discuss.png';
import PasswordInput from "@/components/ui/PasswordInput";
import { toast } from "react-toastify";
import { RegisterDto, register } from "@/services/user/services";
import CustomToastError from "@/utils/CustomToastError";
// import { Button } from "@/components/ui/Button";
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay } from "@mantine/core";

interface registerInput {
    email: string,
    name: string,
    password: string,
    repeatPassword: string
}

const RegisterModal = () => {
    const isShow = useGlobalStore((state) => state.registerIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleRegister)
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)

    const [isLoading, loadingHandler] = useDisclosure(false);

    const [registerValues, setRegisterValues] = useState<registerInput>({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
    })

    const login = (e: any) => {
        if (!isLoading) {
            toggleModal();
            toggleLogin();
        } else {
            e.stopPropagation();
        }
    }

    const isPopulated = () => {
        if (registerValues?.email && registerValues?.password && registerValues?.name && registerValues?.repeatPassword) {
            return true;
        } else {
            CustomToastError("Empty Fields!");
            return false;
        }
    }

    const isEmailValid = () => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerValues.email)) {
            return true;
        } else {
            CustomToastError("Email is invalid!");
            return false;
        }
    }

    const isPasswordValid = () => {
        if (registerValues?.password === registerValues?.repeatPassword) {
            return true;
        } else {
            CustomToastError("Repeated Password is not same!");
            return false;
        }
    }

    const handleRegister = async () => {
        loadingHandler.open();
        if (isPopulated() && isEmailValid() && isPasswordValid()) {
            const newUser: RegisterDto = {
                email: registerValues.email,
                username: registerValues.name,
                password: registerValues.password
            }

            const response = await register(newUser);
            if (response &&
                response.status === 200 &&
                response.data === "User registered successfully") {

                toast.success("Registration successful! Please proceed to login.");
                toggleModal();
            }
        }
        loadingHandler.close();
    }

    useEffect(() => {
        if (!isShow) {
            setRegisterValues({
                email: "",
                name: "",
                password: "",
                repeatPassword: "",
            })
        }
    }, [isShow])

    return (
        <Modal isShow={isShow}
            toggleModal={toggleModal}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="flex h-[75vh] w-full">
                <div className="px-7 lg:px-10 py-7 flex flex-col h-full lg:w-1/2 overflow-y-auto">
                    <div className="flex items-center flex-none">
                        <div className='w-10 h-10 relative'>
                            <Image src={WeViewLogo} alt='WeView Logo' fill />
                        </div>
                        <div className="text-2xl text-main ml-3">Register</div>
                    </div>

                    <div className="pt-5 flex flex-col grow justify-around">
                        <div className="flex flex-col mb-3">
                            <label className="mb-1">Email</label>
                            <input type="text" placeholder="Email" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                                value={registerValues.email}
                                onChange={(e) => { setRegisterValues({ ...registerValues, email: e.target.value }) }} />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label className="mb-1">Display Name</label>
                            <input type="text" placeholder="Display Name" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                                value={registerValues.name}
                                onChange={(e) => { setRegisterValues({ ...registerValues, name: e.target.value }) }} />
                        </div>
                        <div className="mb-3">
                            <PasswordInput
                                value={registerValues.password}
                                onChange={(e) => { setRegisterValues({ ...registerValues, password: e.target.value }) }}
                            ></PasswordInput>
                        </div>
                        <div className="mb-3">
                            <PasswordInput isRepeat
                                value={registerValues.repeatPassword}
                                onChange={(e) => { setRegisterValues({ ...registerValues, repeatPassword: e.target.value }) }}
                            ></PasswordInput>
                        </div>

                        <div className="flex justify-between items-center mb-3 ">
                            <label className="cursor-pointer text-black/50 mr-5 text-sm hover:text-main" onClick={login}>Already have an account? Click here!</label>
                            <Button className="mt-3 bg-main" variant='filled'
                                onClick={handleRegister}
                            >Register</Button>
                        </div>
                    </div>
                </div>

                <div className="h-full overflow-hidden w-0 lg:w-1/2">
                    <Image src={registerImage} alt={"Register Image"} className="h-full object-cover object-right-top"></Image>
                </div>
            </div>
        </Modal >
    )
}

export default RegisterModal 
