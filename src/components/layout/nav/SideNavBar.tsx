import { useAuthStore } from '@/states/authStates';
import { useGlobalStore } from '@/states/globalStates';
import useStore from '@/utils/useStore';
import { Drawer, ScrollArea } from '@mantine/core';
import { ReactNode } from 'react';
import LoggedInSideNav from './LoggedInSideNav';
import SideNavItems from './SideNavItems';

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
                {user ? <LoggedInSideNav></LoggedInSideNav>
                    : <SideNavItems></SideNavItems>
                }

            </Drawer>
        </>
    );
}

export default SideNavBar;
