import ReviewBlock from "@/components/templates/review/ReviewBlock";
import Modal from "@/components/ui/Modal";
import { useGlobalStore } from "@/states/globalStates";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';

const InspectReviewModal = () => {
    const isShow = useGlobalStore((state) => state.inspectReviewIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleInspectReview)
    const { inspectingReview } = useGlobalStore();

    return (
        <Modal isShow={isShow}
            toggleModal={() => toggleModal(undefined)}>
            <div className="p-8 w-[60vw] flex flex-col">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Inspect Review"}</div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="border border-main p-5 rounded-lg bg-white-plain">
                        <ReviewBlock
                            isPreview
                            review={inspectingReview}
                            user={inspectingReview?.user}
                        ></ReviewBlock>
                    </div>
                </div>
            </div>

        </Modal >
    )
}

export default InspectReviewModal 
