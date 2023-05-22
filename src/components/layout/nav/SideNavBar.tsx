import { ReactNode, useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '@/states/global-states';
import { useAuthStore } from '@/states/auth-states';
import blankUserImage from '../../../assets/blank_user.png'
import OutsideAlerter from '@/utils/OutsideAlerter';
import LoggedInSideNav from './LoggedInSideNav';
import SideNavItems from './SideNavItems';
import { getUserImage } from '@/services/user/services';
import { Base64 } from 'js-base64';
import { base64StringToBlob } from 'blob-util';


export interface SideNavBarProps {
    children?: ReactNode,
    profilePic?: any
}

const SideNavBar = (props: SideNavBarProps) => {
    const navIsOpen = useGlobalStore((state) => state.navIsOpen)
    const toggleNav = useGlobalStore((state) => state.toggleNav)

    const user = useAuthStore((state) => state.loggedInUser)

    const [img, setImg] = useState("");

    useEffect(() => {
        getImage();
    }, [user])

    const getImage = () => {
        if (user) {
            const fetchData = async () => {
                const response = await getUserImage(user.id);

                if (response) {
                    console.log(response.data);
                    const img = URL.createObjectURL(response.data);
                    setImg(img);
                }

            }
            fetchData().catch(console.error)
        }
    }

    const wrapperRef = useRef<HTMLDivElement>(null);
    OutsideAlerter({
        ref: wrapperRef,
        isOpen: navIsOpen,
        setFunction: toggleNav
    });

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
                    {user ? <LoggedInSideNav username={user.username} image={user && img ? img : blankUserImage}></LoggedInSideNav>
                        : <SideNavItems></SideNavItems>
                    }
                </div>
            </div>
        </div>
    );
}

export default SideNavBar;
