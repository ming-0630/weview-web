import FileUpload from "@/components/ui/FileUpload";
import Modal from "@/components/ui/Modal";
import { addReward } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, Input, Textarea } from "@mantine/core";
import Image from 'next/image';
import { useState } from "react";
import WeViewLogo from '/public/favicon.ico';
import { toast } from "react-toastify";

export interface CreateReward {
    name: string,
    codes: string,
    points: string,
}

const NewRewardModal = () => {
    const isShow = useGlobalStore((state) => state.newRewardIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleNewRewardIsOpen)
    const { refreshFunction, loadingHandler } = useGlobalStore();

    const [images, setImages] = useState<File[]>([])

    const [formData, setFormData] = useState<CreateReward>({
        name: "",
        codes: "",
        points: ""
    });

    const handleSubmit = async () => {
        loadingHandler.open();
        try {
            const data = new FormData();
            if (images.length <= 0) {
                CustomToastError("No images uploaded!")
                return;
            }

            if (!formData.name || !formData.codes || !formData.points) {
                CustomToastError("Empty Fields!")
                return;
            }

            const resultArray = convertStringToArray(formData.codes);
            if (!resultArray) {
                CustomToastError("Invalid String format!")
                return;
            }

            data.append('uploadedImage', images[0])
            data.append("name", formData.name);
            data.append("points", formData.points);
            resultArray.forEach((value) => {
                data.append('codes', value);
            });

            const response = await addReward(data);

            if (response && response.status == 200) {
                toast.success("Added reward");
                if (refreshFunction) {
                    refreshFunction();
                }
                setImages([]);
                toggleModal();
            }
        } finally {
            loadingHandler.close();
        }

    }

    const convertStringToArray = (string: string) => {
        const regex = /^[a-zA-Z0-9]+(?:;\s?[a-zA-Z0-9]+)*$/;

        if (!regex.test(string)) {
            // String does not fulfill the desired format
            return null;
        }
        const arr = string.replace(/\s/g, '').split(';');
        return arr;
    }

    return (
        <Modal isShow={isShow}
            toggleModal={toggleModal}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"New Reward Creation"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <Input placeholder="Name" value={formData?.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} ></Input>
                    <Input placeholder="Points Needed" type="number" value={formData?.points}
                        onChange={(e) => { setFormData({ ...formData, points: e.target.value }) }} ></Input>
                    <Textarea placeholder="Codes should be seperated by ';'" value={formData?.codes}
                        onChange={(e) => { setFormData({ ...formData, codes: e.target.value }) }} ></Textarea>
                    <div className="pt-5">
                        <FileUpload
                            files={images}
                            setFiles={setImages}
                            containerClassName="max-h-[45vh]"
                        ></FileUpload>
                    </div>
                    <Button className="bg-main w-24 mt-3 self-end" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </Modal >
    )
}

export default NewRewardModal 
