import FileUpload from "@/components/ui/FileUpload";
import Modal from "@/components/ui/Modal";
import { useGlobalStore } from "@/states/globalStates";
import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useState } from "react";
import useStore from "@/utils/useStore";
import { AuthTokens, useAuthStore } from "@/states/authStates";
import blankUserImage from '../../../assets/blank_user.png';
import { Button } from "@/components/ui/Button";
import CustomToastError from "@/utils/CustomToastError";
import { update } from "lodash";
import { updateProfilePicture } from "@/services/user/services";
import { toast } from "react-toastify";
import User from "@/interfaces/userInterface";
import { base64StringToBlob } from "blob-util";

const UploadProfilePicModal = () => {
    const isShow = useGlobalStore((state) => state.uploadIsOpen)
    const toggleUpload = useGlobalStore((state) => state.toggleUpload)
    const user = useStore(useAuthStore, ((state) => state.loggedInUser));
    const accessToken = useStore(useAuthStore, ((state) => state.accessToken));
    const refreshToken = useStore(useAuthStore, ((state) => state.refreshToken));
    const clientLogin = useAuthStore((state) => state.login)

    const [images, setImages] = useState<File[]>([])
    const [isLoading, loadingHandler] = useDisclosure(false);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            loadingHandler.open();

            if (images.length <= 0) {
                CustomToastError("No images uploaded!")
                return;
            }

            const data = new FormData();
            if (images) {
                data.append('uploadedImage', images[0])
            }

            const response = await updateProfilePicture(data);

            if (response && response.status == 200 && response.data) {
                toast.success("Uploaded image successfully!");
                const data = response.data;
                const tokens: AuthTokens = {
                    accessToken: accessToken!,
                    refreshToken: refreshToken!
                }

                const updatedUser: User = {
                    id: data.user.id,
                    username: data.user.username,
                    userImageBase64: data.user.userImage,
                    isVerified: data.user.isVerified
                }
                if (data.user && data.user.userImage) {
                    const blob = base64StringToBlob(data.user.userImage);
                    const img = URL.createObjectURL(blob);
                    updatedUser.userImage = img
                }
                clientLogin(tokens, updatedUser)
                toggleUpload();
            }
        } catch (e) {
            console.log(e)
        } finally {
            loadingHandler.close();
        }
    }

    return (
        <Modal isShow={isShow}
            isLoading={isLoading}
            toggleModal={toggleUpload}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="p-8 w-[70vw] sm:w-[60vw] flex flex-col">
                <div className="flex items-center">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">Upload New Profile Picture</div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="rounded-full border-main border-2 ml-4 mr-6 w-16 h-16 relative">
                        <Image src={images.length > 0 ? URL.createObjectURL(images[0]) : (user && user.userImage ? user.userImage : blankUserImage)}
                            alt="User Profile Pic" fill className='object-cover rounded-full' unoptimized></Image>
                    </div>
                    <div className="text-main text-2xl font-semibold">{user?.username}</div>
                </div>

                <div className="pt-5">
                    <FileUpload
                        files={images}
                        setFiles={setImages}
                        containerClassName="max-h-[45vh]"
                    ></FileUpload>
                </div>
                <div className="self-end mt-5">
                    <Button onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </Modal>
    )
}

export default UploadProfilePicModal 
