import { HomeIcon, CubeIcon, ArrowTrendingUpIcon, BoltIcon, ChartBarSquareIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, MusicalNoteIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import NavItem from "./NavItem"
import WeViewLogo from '/public/favicon.ico';
import NavItemCollapse from "./NavItemCollapse"
import Image from 'next/image';
import { useGlobalStore } from "@/states/globalStates";

const SideNavItems = () => {
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)
    const toggleRegister = useGlobalStore((state) => state.toggleRegister)

    const openLoginModal = () => {
        toggleNav();
        toggleLogin();
    }

    const openRegisterModal = () => {
        toggleNav();
        toggleRegister();
    }
    return (
        <div className="flex flex-col p-5" tabIndex={-1}>
            <div className="flex justify-center items-center">
                <Image src={WeViewLogo} alt="WeView logo" width={50}></Image>
            </div>
            <div className='flex justify-center mx-3 my-5'>
                <label className='btn btn-primary mr-4 text-white' onClick={openLoginModal}>Login</label>
                <label className='btn btn-outline btn-primary hover:text-white' onClick={openRegisterModal}>Register</label>
            </div>

            <hr className="border-none h-0.5 bg-black/10 rounded my-2"></hr>
            <input type="text" autoFocus className="hidden" />
            <NavItem
                title='Home'
                href={'/'}
                icon={<HomeIcon className='w-6 m-3'></HomeIcon>}
            ></NavItem>
            <NavItem
                title='Trending / New Product'
                href={'/temp-new-product-page'}
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
        </div>
    )
}

export default SideNavItems