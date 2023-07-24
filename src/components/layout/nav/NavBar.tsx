import WeViewLogo from '/public/favicon.ico';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import SearchModal from './SearchModal';
import SideNavBar from './SideNavBar';
import Head from 'next/head';
import { useGlobalStore } from '@/states/globalStates';
import OutsideAlerter from '@/utils/OutsideAlerter';
import Link from 'next/link';

export interface NavBarProps {
    children?: ReactNode;
    title?: string;
}

const NavBar = (props: NavBarProps) => {
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const drawerButton = useRef<HTMLLabelElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const global = useGlobalStore((state) => { return state });

    OutsideAlerter({
        ref: wrapperRef,
        isOpen: searchIsOpen,
        setFunction: () => { setSearchIsOpen(false) }
    });


    const toggleSearch = () => {
        setSearchIsOpen(true);
    }

    const nav = (
        <div className='bg-gray-dark w-full h-20 z-10 sticky top-0' ref={wrapperRef}>
            <div className="relative h-full items-center">
                <SearchModal isOpen={searchIsOpen} setIsOpen={setSearchIsOpen} />

                <div className='flex h-full'>
                    <div className='flex-1 pl-20 flex items-center'>
                        <Link href="/" className='block w-16'>
                            <Image src={WeViewLogo} className='w-10' alt='WeView Logo' />
                        </Link>
                    </div>

                    <div className='flex-1 pr-20 flex justify-end items-center'>
                        <MagnifyingGlassIcon className='fill-main h-7 cursor-pointer transition-colors duration-300 hover:fill-white mr-3'
                            onClick={toggleSearch}></MagnifyingGlassIcon>
                        <Bars3Icon className='fill-main h-7 cursor-pointer transition-colors duration-300 hover:fill-white' onClick={() => { global.toggleNav() }}></Bars3Icon>
                        <label htmlFor="side-nav-drawer" className="drawer-button hidden" ref={drawerButton}>Open drawer</label>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>{props.title ?? "WeView"}</title>
            </Head>
            {nav}
            <SideNavBar></SideNavBar>
            {props.children}
        </>
    );
}

export default NavBar;
