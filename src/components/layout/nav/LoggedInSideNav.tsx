import { UserCircleIcon, PencilSquareIcon, ChatBubbleLeftRightIcon, HomeIcon, CubeIcon, HeartIcon, ArrowTrendingUpIcon, Squares2X2Icon, DevicePhoneMobileIcon, ComputerDesktopIcon, BoltIcon, MusicalNoteIcon, ChartBarSquareIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"
import NavItem from "./NavItem"
import NavItemCollapse from "./NavItemCollapse"
import Image, { StaticImageData } from 'next/image';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useGlobalStore } from "@/states/globalStates";
import WeViewLogo from '/public/favicon.ico';
import { useAuthStore } from "@/states/authStates";
import ConfirmModal from "@/components/templates/authentication/ConfirmModal";
import { GetServerSideProps } from "next";
import { client } from "@/services/axiosClient";

export interface LoggedInSideNavProps {
    username: string;
    image: string | StaticImageData | any
}

const LoggedInSideNav = (props: LoggedInSideNavProps) => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const logout = useAuthStore((state) => state.logout)

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-center items-center mb-1">
                <Image src={WeViewLogo} alt="WeView logo" width={50}></Image>
            </div>
            <NavItemCollapse title={props.username}
                icon={<div className="rounded-full border-main border-2 ml-4 mr-6 w-12 h-12 relative">
                    <Image src={props.image} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                </div>}
                className='text-xl !p-3'
            >
                <NavItem
                    title='My Profile'
                    href={'/'}
                    icon={<UserCircleIcon className='w-6 m-3'></UserCircleIcon>}
                ></NavItem>
                <NavItem
                    title='My Reviews'
                    href={'/'}
                    icon={<PencilSquareIcon className='w-6 m-3'></PencilSquareIcon>}
                ></NavItem>
                <NavItem
                    title='My Comments'
                    href={'/'}
                    icon={<ChatBubbleLeftRightIcon className='w-6 m-3'></ChatBubbleLeftRightIcon>}
                ></NavItem>
            </NavItemCollapse>
            <hr className="border-none h-0.5 text-black/10 bg-black/10 rounded my-3"></hr>
            <NavItem
                title='My Watchlist'
                href={'/'}
                icon={<HeartIcon className='w-6 m-3'></HeartIcon>}
            ></NavItem>
            <NavItem
                title='Home'
                href={'/'}
                icon={<HomeIcon className='w-6 m-3'></HomeIcon>}
            ></NavItem>
            <NavItem
                title='Trending'
                href={'/product-list-page'}
                icon={<ArrowTrendingUpIcon className='w-6 m-3'></ArrowTrendingUpIcon>}
            ></NavItem>
            <NavItem
                title='All Products'
                href={'/product-list-page'}
                icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
            ></NavItem>
            <NavItemCollapse
                title='Categories'
                icon={<Squares2X2Icon className='w-6 m-3'></Squares2X2Icon>}>
                <NavItem
                    title='Smartphones'
                    href={'/product-list-page'}
                    icon={<DevicePhoneMobileIcon className='w-6 m-3'></DevicePhoneMobileIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Music'
                    href={'/product-list-page'}
                    icon={<MusicalNoteIcon className='w-6 m-3'></MusicalNoteIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Computers'
                    href={'/product-list-page'}
                    icon={<ComputerDesktopIcon className='w-6 m-3'></ComputerDesktopIcon>}
                    isNavItem
                ></NavItem>
                <NavItem
                    title='Home Appliances'
                    href={'/product-list-page'}
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
                    onClickYes: () => { toggleConfirm(); logout(); }
                });
                toggleNav();
            }}>Logout</div>
        </div>
    )
}

export default LoggedInSideNav