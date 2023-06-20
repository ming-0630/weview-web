import User from "@/interfaces/userInterface";
import { fetchUserDetails } from "@/services/user/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import useStore from "@/utils/useStore";
import { CheckIcon, FireIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { useEffect, useState } from "react";
import blankUserImage from '../../../assets/blank_user.png';
import { Input, Tabs } from "@mantine/core";

const Profile = () => {
    const [user, setUser] = useState<User>()
    const currentUser = useStore(useAuthStore, (state) => state.loggedInUser)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getUserDetails = async () => {
        loadingHandler.open();
        try {
            const response = await fetchUserDetails();

            if (response && response.data) {
                setUser
            }
        } catch (e) {
            console.error(e);
        } finally {
            loadingHandler.close();
        }
    }


    useEffect(() => {
        getUserDetails();
        setUser(currentUser)
    }, [])
    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col">
                <div className="flex justify-between">
                    <div className="flex justify-center">
                        <div className="relative w-12 h-12 border border-main rounded-full mr-3">
                            <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                        </div>
                        <div className="flex flex-col" >
                            <div className="text-main font-bold text-5xl mb-2">{currentUser?.username}</div>
                            <div className="flex items-center">
                                <FireIcon className="w-6 mr-2"></FireIcon>
                                <div>{"555 points"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-end">
                        <div className="text-white bg-main rounded-lg py-2 px-4 flex text-md">
                            <CheckIcon className="w-5 mr-2"></CheckIcon>
                            Verified
                        </div>
                        <div className="text-white bg-red-400 rounded-lg py-2 px-4 flex text-md">
                            <XMarkIcon className="w-5 mr-2"></XMarkIcon>
                            Not Verified
                        </div>
                    </div>
                </div>
                <div className="flex mt-14">
                    <Tabs defaultValue="profileDetails" className="w-full">
                        <Tabs.List>
                            <Tabs.Tab value="profileDetails" icon={<PencilIcon className="w-3"></PencilIcon>}>Profile Details</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="profileDetails" pt="xs">
                            <div>
                                <Input.Wrapper label="">
                                    <Input disabled value={"Walao"}></Input>
                                </Input.Wrapper>

                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Profile