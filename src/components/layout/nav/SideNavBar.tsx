import { ReactNode, useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '@/states/globalStates';
import { useAuthStore } from '@/states/authStates';
import blankUserImage from '../../../assets/blank_user.png'
import OutsideAlerter from '@/utils/OutsideAlerter';
import LoggedInSideNav from './LoggedInSideNav';
import SideNavItems from './SideNavItems';
import User from '@/interfaces/userInterface';


export interface SideNavBarProps {
    children?: ReactNode,
    profilePic?: any
}

const SideNavBar = (props: SideNavBarProps) => {
    const navIsOpen = useGlobalStore((state) => state.navIsOpen)
    const toggleNav = useGlobalStore((state) => state.toggleNav)

    const [loggedInUser, setLoggedInUser] = useState<User>();

    const user = useAuthStore((state) => state.loggedInUser)

    const wrapperRef = useRef<HTMLDivElement>(null);
    OutsideAlerter({
        ref: wrapperRef,
        isOpen: navIsOpen,
        setFunction: toggleNav
    });

    useEffect(() => {
        setLoggedInUser(user)
    }, [user])

    return (
        <div className="drawer drawer-end absolute overflow-y-auto">
            <input type="checkbox" className="drawer-toggle" checked={navIsOpen} readOnly />
            <div className="drawer-content">
                {props.children}
            </div>
            <div className="drawer-side">
                <label htmlFor="side-nav-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-72 lg:w-[21rem] bg-white text-base-content text-gray-dark" ref={wrapperRef}>
                    {/* <!-- Sidebar content here --> */}
                    {loggedInUser ? <LoggedInSideNav username={loggedInUser.username}
                        image={loggedInUser && loggedInUser.userImage ? loggedInUser.userImage : blankUserImage}></LoggedInSideNav>
                        : <SideNavItems></SideNavItems>
                    }
                </div>
            </div>
        </div>
    );
}

export default SideNavBar;
