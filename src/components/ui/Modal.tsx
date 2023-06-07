import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode } from "react";

export interface ModalProps {
    isShow: boolean;
    toggleModal: () => void;
    children?: ReactNode;
    isLoading?: boolean
}

const Modal = (props: ModalProps) => {
    return (
        <div>
            <input type="checkbox" className="modal-toggle" readOnly checked={props.isShow} />
            <div className="modal">
                <div className={"modal-box relative bg-white p-0 max-w-[80vw] xl:max-w-[70vw]  w-fit"}>
                    <XMarkIcon className={classNames(
                        "cursor-pointer absolute right-6 top-4 hover:text-red-500 w-6 stroke-[2]",
                        props.isLoading && "hidden"
                    )} onClick={props.toggleModal}></XMarkIcon>
                    {/* <label className="border-0  bg-transparent font-extrabold" >✕</label> */}
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Modal 
