import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export interface ModalProps {
    modalId: string;
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    return (
        <div>
            <input type="checkbox" id={props.modalId} className="modal-toggle" />
            <div className="modal">
                <div className={"modal-box relative bg-white"}>
                    <label htmlFor={props.modalId} className="border-0 cursor-pointer absolute right-6 top-4 hover:text-red-500 bg-white hover:bg-white">✕</label>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Modal 
