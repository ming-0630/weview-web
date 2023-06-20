import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useGlobalStore } from "@/states/globalStates";

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
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{(confirmDetails && confirmDetails.title) ?? "Title"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <div className="text-xl mb-3">{(confirmDetails && confirmDetails.description) ?? " Description"}</div>
                    <div className="self-end">
                        <div className="btn btn-success mr-3" onClick={confirmDetails && confirmDetails.onClickYes}>yes</div>
                        <div className="btn btn-error" onClick={() => { toggleModal() }}>No</div>
                    </div>
                </div>

            </div>
        </Modal >
    )
}

export default ConfirmModal 
