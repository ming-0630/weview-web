import RewardCard from "@/components/layout/rewardCard/RewardCard";
import FileUpload from "@/components/ui/FileUpload";
import Modal from "@/components/ui/Modal";
import { Reward } from "@/interfaces/rewardInterface";
import { editReward } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, Input } from "@mantine/core";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WeViewLogo from '/public/favicon.ico';

const EditRewardModal = () => {
    const isShow = useGlobalStore((state) => state.editRewardIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleEditRewardIsOpen)
    const { editingReward, refreshFunction, loadingHandler } = useGlobalStore();

    const [images, setImages] = useState<File[]>([])

    const [formData, setFormData] = useState<Reward>();

    const handleSubmit = async () => {
        loadingHandler.open();
        try {
            const data = new FormData();

            if (formData) {
                if (!formData.name || !formData.points) {
                    CustomToastError("Empty Fields!")
                    return;
                }

                if (!formData.id) {
                    CustomToastError("No reward id found!")
                    return;
                }

                if (images.length > 0) {
                    data.append('uploadedImage', images[0])
                }

                data.append("id", formData.id)
                data.append("name", formData.name);
                data.append("points", formData.points.toString());

                const response = await editReward(data);

                if (response && response.status == 200) {
                    toast.success("Edited reward");
                    if (refreshFunction) {
                        refreshFunction();
                    }
                    toggleModal();
                }
            }
        } finally {
            loadingHandler.close();
        }
    }

    useEffect(() => {
        setFormData(editingReward)
    }, [editingReward])

    return (
        <Modal isShow={isShow}
            toggleModal={() => toggleModal(undefined)}>
            <div className="p-5 w-[60vw] flex flex-col">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Edit Reward"}</div>
                </div>
                <div className="flex p-4 gap-4">
                    <div className="grow">
                        <div className="flex flex-col">
                            <Input placeholder="Name" value={formData?.name}
                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} ></Input>
                            <Input placeholder="Points Needed" type="number" value={formData?.points}
                                onChange={(e) => { setFormData({ ...formData, points: e.target.value }) }} ></Input>
                            <div className="pt-5">
                                <FileUpload
                                    files={images}
                                    setFiles={setImages}
                                    containerClassName="max-h-[45vh]"
                                ></FileUpload>
                            </div>

                        </div>
                    </div>
                    <div className="items-center flex ml-5">
                        <RewardCard reward={formData ?? editingReward!} isPreview
                            previewImage={images.length > 0 ? URL.createObjectURL(images[0]) : undefined}
                        ></RewardCard>
                    </div>
                </div>
                <div className="flex gap-3 self-end">
                    <Button className="bg-main w-24 mt-3" onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </Modal >
    )
}

export default EditRewardModal 
