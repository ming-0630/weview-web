import { CubeIcon, HomeIcon } from '@heroicons/react/24/outline';
import { ReactNode, useRef, useState } from 'react';
import NavItem from './NavItem';
import NavItemCollapse from './NavItemCollapse';
import { GlobalState, useGlobalStore } from '@/states/global-states';
import { useAuthStore } from '@/states/auth-states';


export interface SearchModalProps {
    children?: ReactNode
}

const SideNavBar = (props: SearchModalProps) => {
    const navIsOpen = useGlobalStore((state) => state.navIsOpen)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)
    const toggleRegister = useGlobalStore((state) => state.toggleRegister)

    const user = useAuthStore((state) => state.loggedInUser)

    const openLoginModal = () => {
        toggleNav();
        toggleLogin();
    }

    const openRegisterModal = () => {
        toggleNav();
        toggleRegister();
    }

    const noLoggedInUser = (
        <div className='flex justify-center mt-3'>
            <label className='btn btn-primary mr-4 text-white' onClick={openLoginModal}>Login</label>
            <label className='btn btn-outline btn-primary hover:text-white' onClick={openRegisterModal}>Register</label>
        </div>
    )

    return (
        <div className="drawer drawer-end absolute overflow-y-auto">
            <input type="checkbox" className="drawer-toggle" checked={navIsOpen} readOnly />
            <div className="drawer-content">
                {props.children}
            </div>
            <div className="drawer-side">
                <label htmlFor="side-nav-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-72 lg:w-[21rem] bg-white text-base-content text-gray-dark">
                    {/* <!-- Sidebar content here --> */}
                    {user ?
                        <div className='flex justify-center mt-3'>
                            <label className='btn btn-primary mr-4 text-white' onClick={openLoginModal}>{user.username}</label>
                            <label className='btn btn-outline btn-primary hover:text-white' onClick={openRegisterModal}>Register</label>
                        </div>
                        : noLoggedInUser

                    }

                    <div className='pt-8'>
                        <NavItem
                            title='Home'
                            href={'/'}
                            icon={<HomeIcon className='w-6 m-3'></HomeIcon>}
                        ></NavItem>
                        <NavItem
                            title='Products'
                            href={'/product-list-page'}
                            icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
                        ></NavItem>
                        <NavItemCollapse
                            title='More'
                            icon={<CubeIcon className='w-6 m-3'></CubeIcon>}>
                            <NavItem
                                title='Products'
                                href={'/product-list-page'}
                                icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
                                isNavItem
                            ></NavItem>
                            <NavItem
                                title='Products'
                                href={'/product-list-page'}
                                icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
                                isNavItem
                            ></NavItem>
                        </NavItemCollapse>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavBar;
