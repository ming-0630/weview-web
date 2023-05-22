import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export interface ModalProps {
    isShow: boolean;
    toggleModal: () => void;
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    return (
        <div>
            <input type="checkbox" className="modal-toggle" readOnly checked={props.isShow} />
            <div className="modal">
                <div className={"modal-box relative bg-white p-0 max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg w-fit"}>
                    <XMarkIcon className="cursor-pointer absolute right-6 top-4 hover:text-red-500 w-6 stroke-[2]" onClick={props.toggleModal}></XMarkIcon>
                    {/* <label className="border-0  bg-transparent font-extrabold" >✕</label> */}
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Modal 
