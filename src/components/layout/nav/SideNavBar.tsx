import { ReactNode } from 'react';
import { useGlobalStore } from '@/states/globalStates';
import { useAuthStore } from '@/states/authStates';
import blankUserImage from '../../../assets/blank_user.png'
import LoggedInSideNav from './LoggedInSideNav';
import SideNavItems from './SideNavItems';
import useStore from '@/utils/useStore';
import { Drawer, ScrollArea } from '@mantine/core';

export interface SideNavBarProps {
    children?: ReactNode,
    profilePic?: any
}

const SideNavBar = (props: SideNavBarProps) => {
    const navIsOpen = useGlobalStore((state) => state.navIsOpen)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const user = useStore(useAuthStore, (state) => state.loggedInUser)

    return (
        <>
            <Drawer opened={navIsOpen} onClose={toggleNav} position='right' size="25%" withCloseButton={false}
                scrollAreaComponent={ScrollArea.Autosize}
                classNames={{
                    body: "min-h-screen p-0"
                }}>
                {user ? <LoggedInSideNav username={user.username}
                    image={user && user.userImage ? user.userImage : blankUserImage}></LoggedInSideNav>
                    : <SideNavItems></SideNavItems>
                }

            </Drawer>
        </>
    );
}

export default SideNavBar;
