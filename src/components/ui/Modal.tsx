import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { ReactNode } from "react";

export interface ModalProps {
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </div>
            </div>
        </div>
    )
}

export default Modal 
