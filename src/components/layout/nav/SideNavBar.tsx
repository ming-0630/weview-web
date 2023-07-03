import { useAuthStore } from '@/states/authStates';
import { useGlobalStore } from '@/states/globalStates';
import useStore from '@/utils/useStore';
import { Drawer, ScrollArea } from '@mantine/core';
import { ReactNode, useEffect } from 'react';
import LoggedInSideNav from './LoggedInSideNav';
import SideNavItems from './SideNavItems';
import { log } from 'console';

export interface SideNavBarProps {
    children?: ReactNode,
    profilePic?: any
}

const SideNavBar = (props: SideNavBarProps) => {
    const navIsOpen = useGlobalStore((state) => state.navIsOpen)
    const toggleNav = useGlobalStore((state) => state.toggleNav)
    const { loggedInUser } = useAuthStore();

    return (
        <>
            <Drawer opened={navIsOpen} onClose={toggleNav} position='right' className='w-[25vw] xl:w-[20vw]' withCloseButton={false}
                scrollAreaComponent={ScrollArea.Autosize}
                classNames={{
                    body: "min-h-screen p-0"
                }}>
                {loggedInUser ? <LoggedInSideNav></LoggedInSideNav>
                    : <SideNavItems></SideNavItems>
                }

            </Drawer>
        </>
    );
}

export default SideNavBar;
