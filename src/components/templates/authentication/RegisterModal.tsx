import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/states/global-states";
import registerImage from '../../../assets/discuss.png';
import PasswordInput from "@/components/ui/PasswordInput";
import { toast } from "react-toastify";
import { useAuthStore } from "@/states/auth-states";
import { RegisterDto, register } from "@/services/user/services";

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

    const [registerValues, setRegisterValues] = useState<registerInput>({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
    })

    const login = () => {
        toggleModal();
        toggleLogin();
    }

    const isPopulated = () => {
        if (registerValues?.email && registerValues?.password && registerValues?.name && registerValues?.repeatPassword) {
            return true;
        } else {
            toast.error("Empty Fields!");
            return false;
        }
    }

    const isEmailValid = () => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerValues.email)) {
            return true;
        } else {
            toast.error("Email is invalid!");
            return false;
        }
    }

    const isPasswordValid = () => {
        if (registerValues?.password === registerValues?.repeatPassword) {
            return true;
        } else {
            toast.error("Repeated Password is not same!");
            return false;
        }
    }

    const handleRegister = async () => {
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
            <div className="flex h-[65vh] w-50vw]">
                <div className="px-10 py-7 w-1/2 flex flex-col h-full">
                    <div className="flex items-center flex-none">
                        <div className='w-10 h-10 relative'>
                            <Image src={WeViewLogo} alt='WeView Logo' fill />
                        </div>
                        <div className="text-2xl text-main ml-3">Register</div>
                    </div>

                    <div className="pt-5 flex flex-col grow justify-around">
                        <div className="flex flex-col">
                            <label className="mb-1">Email</label>
                            <input type="text" placeholder="Email" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                                value={registerValues.email}
                                onChange={(e) => { setRegisterValues({ ...registerValues, email: e.target.value }) }} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Display Name</label>
                            <input type="text" placeholder="Display Name" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                                value={registerValues.name}
                                onChange={(e) => { setRegisterValues({ ...registerValues, name: e.target.value }) }} />
                        </div>
                        <div>
                            <PasswordInput
                                value={registerValues.password}
                                onChange={(e) => { setRegisterValues({ ...registerValues, password: e.target.value }) }}
                            ></PasswordInput>
                        </div>
                        <div>
                            <PasswordInput isRepeat
                                value={registerValues.repeatPassword}
                                onChange={(e) => { setRegisterValues({ ...registerValues, repeatPassword: e.target.value }) }}
                            ></PasswordInput>
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="cursor-pointer text-black/50 text-sm hover:text-main" onClick={login}>Already have an account? Click here!</label>
                            <label className='btn btn-primary mr-4 text-white'
                                onClick={handleRegister}>Register</label>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 h-full overflow-hidden">
                    <Image src={registerImage} alt={"Register Image"}></Image>
                </div>
            </div>
        </Modal >
    )
}

export default RegisterModal 
