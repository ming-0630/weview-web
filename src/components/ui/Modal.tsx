import { useGlobalStore } from "@/states/globalStates";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import { ReactNode } from "react";

export interface ModalProps {
    isShow: boolean;
    toggleModal: () => void;
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    const { loading } = useGlobalStore();
    return (
        <div>
            <input type="checkbox" className="modal-toggle" readOnly checked={props.isShow} />
            <div className="modal">
                <LoadingOverlay visible={loading} overlayBlur={2} />
                <div className={"modal-box relative bg-white p-0 max-w-[80vw] w-fit"}>
                    <XMarkIcon className={classNames(
                        "cursor-pointer absolute right-6 top-4 hover:text-red-500 w-6 stroke-[2]",
                        loading && "hidden"
                    )} onClick={props.toggleModal}></XMarkIcon>
                    {/* <label className="border-0  bg-transparent font-extrabold" >✕</label> */}
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Modal 
