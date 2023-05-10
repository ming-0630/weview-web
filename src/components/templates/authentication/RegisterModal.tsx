import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { ReactNode } from "react";
import Link from "next/link";

export interface RegisterModalProps {
    children?: ReactNode;
}

const RegisterModal = (props: RegisterModalProps) => {
    const modalId = "register-modal";

    return (
        <Modal modalId={modalId}>
            <div className="">
                <div className="flex items-center">
                    <div className='w-8 h-8 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-lg text-main ml-3">Register</div>
                </div>

                <div className="pt-5">
                    <div className="flex flex-col">
                        <label className="mb-1">Email</label>
                        <input type="text" placeholder="Email" className="input input-md input-primary input-bordered border-3 bg-white w-full" />
                    </div>

                    <div className="flex flex-col mt-3">
                        <label className="mb-1">Password</label>
                        <input type="text" placeholder="Password" className="input input-primary input-md input-bordered bg-white w-full" />                    </div>

                    <div className="flex flex-start mt-2">
                        <label className="label cursor-pointer ">
                            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mr-2" />
                            <span className="label-text text-black">Show Password</span>
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link href={''}>
                            <span className="text-black/50 text-sm hover:text-main">Don't have an account? Click here!</span>
                        </Link>

                        <label className='btn btn-primary mr-4 text-white' htmlFor={modalId}
                            onClick={() => { }}>Login</label>

                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default RegisterModal 
