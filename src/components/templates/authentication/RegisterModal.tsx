import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { ReactNode } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/states/global-states";
import registerImage from '../../../assets/discuss.png';
import PasswordInput from "@/components/ui/PasswordInput";

export interface RegisterModalProps {
    children?: ReactNode;
}

const RegisterModal = (props: RegisterModalProps) => {
    const isShow = useGlobalStore((state) => state.registerIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleRegister)

    const toggleLogin = useGlobalStore((state) => state.toggleLogin)

    const login = () => {
        toggleModal();
        toggleLogin();
    }

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
                            <input type="text" placeholder="Email" className="input input-md input-primary input-bordered border-3 bg-white w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Display Name</label>
                            <input type="text" placeholder="Display Name" className="input input-md input-primary input-bordered border-3 bg-white w-full" />
                        </div>
                        <div>
                            <PasswordInput></PasswordInput>
                        </div>
                        <div>
                            <PasswordInput isRepeat></PasswordInput>
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="cursor-pointer text-black/50 text-sm hover:text-main" onClick={login}>Already have an account? Click here!</label>
                            <label className='btn btn-primary mr-4 text-white'
                                onClick={() => { }}>Register</label>
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
