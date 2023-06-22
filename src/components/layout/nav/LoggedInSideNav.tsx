import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import useStore from "@/utils/useStore";
import { ArrowTrendingUpIcon, BoltIcon, ChartBarSquareIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon, CubeIcon, DevicePhoneMobileIcon, FireIcon, HeartIcon, HomeIcon, MusicalNoteIcon, PencilSquareIcon, Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@mantine/core";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import blankUserImage from '../../../assets/blank_user.png';
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import WeViewLogo from '/public/favicon.ico';

const LoggedInSideNav = () => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const toggleUpload = useGlobalStore((state) => state.toggleUpload)
    const togglePoints = useGlobalStore((state) => state.togglePoints)
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
                <div className="rounded-full border-gray-300 border-4 ml-4 mr-6 w-14 h-14 relative cursor-pointer hover:brightness-90"
                    onClick={toggleUpload}
                >
                    <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                </div>
                <div className="flex flex-col" >
                    <div className="flex items-center mb-1">
                        <div className="text-main font-bold text-2xl mr-5">{user?.username}</div>
                        {user && user.isVerified ?
                            <Tooltip label="Verified!" withArrow>
                                <CheckCircleIcon className="w-5"></CheckCircleIcon>
                            </Tooltip>
                            : <Tooltip label="Verify your account to unlock full access!" withArrow>
                                <Link href={""}>
                                    <ExclamationTriangleIcon className="w-5 text-red-400"></ExclamationTriangleIcon>
                                </Link>
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
            <NavItem
                title='Home'
                href={'/'}
                icon={<HomeIcon className='w-6 m-3'></HomeIcon>}
            ></NavItem>
            <NavItemCollapse title={'My Profile'}
                icon={<UserCircleIcon className='w-6 m-3'></UserCircleIcon>}
            >
                <NavItem
                    title='My Watchlist'
                    href={'/user/watchlist'}
                    icon={<HeartIcon className='w-6 m-3'></HeartIcon>}
                ></NavItem>
                <NavItem
                    title='My Reviews'
                    href={'/user/reviews'}
                    icon={<PencilSquareIcon className='w-6 m-3'></PencilSquareIcon>}
                ></NavItem>
                <NavItem
                    title='My Comments'
                    href={'/user/comments'}
                    icon={<ChatBubbleLeftRightIcon className='w-6 m-3'></ChatBubbleLeftRightIcon>}
                ></NavItem>
            </NavItemCollapse>
            <NavItem
                title='Trending'
                href={'/product-list-page'}
                icon={<ArrowTrendingUpIcon className='w-6 m-3'></ArrowTrendingUpIcon>}
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
                title='WeView for Business'
                href={'/product-list-page'}
                icon={<ChartBarSquareIcon className='w-6 m-3'></ChartBarSquareIcon>}
                isNavItem
            ></NavItem>
            <div className="btn btn-error text-white hover:brightness-95 justify-self-end mt-auto" onClick={() => {
                toggleConfirm({
                    title: "Confirm Logout?",
                    description: "Are you sure you want to logout?",
                    onClickYes: () => {
                        loadingHandler.open();
                        router.push("/");
                        toggleConfirm();
                        logout();
                        loadingHandler.close();
                    }
                });
                toggleNav();
            }}>Logout</div>
        </div>
    )
}

export default LoggedInSideNav