import Unverified from "@/components/ui/Unverified";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import useStore from "@/utils/useStore";
import { BoltIcon, ChartBarSquareIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon, CubeIcon, DevicePhoneMobileIcon, FireIcon, GiftIcon, HeartIcon, HomeIcon, MusicalNoteIcon, PencilSquareIcon, QuestionMarkCircleIcon, Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@mantine/core";
import Image from 'next/image';
import { useRouter } from "next/router";
import blankUserImage from '../../../assets/blank_user.png';
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import WeViewLogo from '/public/favicon.ico';
import Link from "next/link";
import { toast } from "react-toastify";
import CustomToastError from "@/utils/CustomToastError";

const LoggedInSideNav = () => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const togglePoints = useGlobalStore((state) => state.togglePoints)
    const toggleVerify = useGlobalStore((state) => state.toggleVerify)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const logout = useAuthStore((state) => state.logout)
    const user = useStore(useAuthStore, ((state) => state.loggedInUser))

    const router = useRouter();

    return (
        <div className="min-h-screen p-5 flex flex-col">
            <div className="flex justify-center items-center mb-3">
                <Image src={WeViewLogo} alt="WeView logo" width={50}></Image>
            </div>
            <div className="flex mb-3">
                <Link href={"/user/" + user?.id} className="rounded-full border-gray-300 border-2 ml-4 mr-6 w-14 h-14 relative" onClick={toggleNav} tabIndex={-1}>
                    <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                </Link>
                <div className="flex flex-col" >
                    <div className="flex items-center mb-1">
                        <Link href={"/user/" + user?.id} className="hover:underline hover:decoration-main" onClick={toggleNav} tabIndex={-1}>
                            <div className="text-main font-bold text-2xl mr-3">{user && user.username}</div>
                        </Link>
                        {user && user.isVerified ?
                            <Tooltip label="Verified!" withArrow>
                                <CheckBadgeIcon className="w-5 text-main -mb-0.5"></CheckBadgeIcon>
                            </Tooltip>
                            : <Tooltip label="Click here to verify your account!" withArrow
                                onClick={toggleVerify}
                            >
                                <div className="cursor-pointer group">
                                    <Unverified></Unverified>
                                </div>

                            </Tooltip>
                        }
                    </div>

                    <div className="flex items-center">
                        <Tooltip label="Click here to know more about points!" withArrow onClick={() => { toggleNav(); togglePoints() }}>
                            <div className="flex items-center cursor-pointer">
                                <FireIcon className="w-5 mr-2 text-orange-400"></FireIcon>
                                <div className="text-sm text-orange-400 mr-2">{user?.points ?? 0}</div>
                            </div>
                        </Tooltip>


                    </div>
                </div>
            </div>

            <hr className="border-none h-0.5 text-black/10 bg-black/10 rounded my-3"></hr>
            <input type="text" autoFocus className="hidden" />
            <NavItem
                title='Home'
                href={'/'}
                icon={<HomeIcon className='w-6 m-3'></HomeIcon>}
            ></NavItem>
            <NavItem
                title='My Watchlist'
                href={'/user/watchlist'}
                icon={<HeartIcon className='w-6 m-3'></HeartIcon>}
            ></NavItem>
            <NavItem title={'My Profile'}
                icon={<UserCircleIcon className='w-6 m-3'></UserCircleIcon>}
                href={"/user/" + user?.id}
            ></NavItem>
            <NavItem
                title='Redeem rewards'
                href={'/user/rewards'}
                icon={<GiftIcon className='w-6 m-3'></GiftIcon>}
            ></NavItem>
            <NavItem
                title='All Products'
                href={'/products/all'}
                icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
            ></NavItem>
            <NavItemCollapse
                title='Categories'
                icon={<Squares2X2Icon className='w-6 m-3'></Squares2X2Icon>}>
                <NavItem
                    title='Smartphones'
                    href={'/products/smartphones'}
                    icon={<DevicePhoneMobileIcon className='w-6 m-3'></DevicePhoneMobileIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Music'
                    href={'/products/music'}
                    icon={<MusicalNoteIcon className='w-6 m-3'></MusicalNoteIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Computers'
                    href={'/products/computers'}
                    icon={<ComputerDesktopIcon className='w-6 m-3'></ComputerDesktopIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Home Appliances'
                    href={'/products/homeappliances'}
                    icon={<BoltIcon className='w-6 m-3'></BoltIcon>}
                    isNavItem
                ></NavItem>
            </NavItemCollapse>
            <NavItem
                title='FAQ'
                href={'/faq'}
                icon={<QuestionMarkCircleIcon className='w-6 m-3'></QuestionMarkCircleIcon>}
            ></NavItem>
            <div className="btn btn-error text-white hover:brightness-95 justify-self-end mt-auto" onClick={() => {
                toggleConfirm({
                    title: "Confirm Logout?",
                    description: "Are you sure you want to logout?",
                    onClickYes: () => {
                        toggleConfirm();
                        logout();
                        toast.success("Logout successful!")
                    }
                });
                toggleNav();
            }}>Logout</div>
        </div>
    )
}

export default LoggedInSideNav