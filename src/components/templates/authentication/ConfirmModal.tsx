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
import User from "@/interfaces/user_interface";

export interface ConfirmModalProps {
    title?: string,
    description?: string,
    onClickYes?: (...args: any[]) => void
}

const ConfirmModal = () => {
    const isShow = useGlobalStore((state) => state.confirmIsOpen)
    const confirmDetails = useGlobalStore((state) => state.confirmDetails)
    const toggleModal = useGlobalStore((state) => state.toggleConfirm)
    const toggleNav = useGlobalStore((state) => state.toggleNav)

    return (
        <Modal isShow={isShow}
            toggleModal={toggleModal}>
            <div className="p-5 w-[30vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{(confirmDetails && confirmDetails.title) ?? "Title"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <div className="text-2xl text-main mb-3">{(confirmDetails && confirmDetails.description) ?? " Description"}</div>
                    <div className="self-end">
                        <div className="btn btn-success mr-3" onClick={confirmDetails && confirmDetails.onClickYes}>yes</div>
                        <div className="btn btn-error" onClick={() => { toggleModal(); toggleNav() }}>No</div>
                    </div>
                </div>

            </div>
        </Modal >
    )
}

export default ConfirmModal 
