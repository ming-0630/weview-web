import WeViewLogo from '../../public/WeViewLogo.png';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SearchModal from './SearchModal';
import SideNavBar from './SideNavBar';

export interface NavBarProps {
    children?: ReactNode;
}

const NavBar = (props: NavBarProps) => {
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const drawerButton = useRef<HTMLLabelElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: { target: any; }) {
                if (ref != null) {
                    if (ref.current && !ref.current!.contains(event.target)) {
                        setSearchIsOpen(false);
                    }
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const toggleSearch = () => {
        setSearchIsOpen(true);
    }

    const toggleSideNav = () => {
        drawerButton.current!.click();
    }

    const nav = (
        <div className='bg-gray-dark w-full fixed h-28 z-10' ref={wrapperRef}>
            <div className="relative">
                <SearchModal isOpen={searchIsOpen} setIsOpen={setSearchIsOpen} />

                <div className='flex py-6'>
                    <div className='flex-1 pl-20'>
                        <a href="http://localhost:3000" target="_blank" rel="noreferrer" className='block w-16'>
                            <Image src={WeViewLogo} className='w-16 h-16' alt='WeView Logo' />
                        </a>
                    </div>

                    <div className='flex-1 pt-4 pr-20 flex justify-end'>
                        <MagnifyingGlassIcon className='fill-main h-8 cursor-pointer transition-colors duration-300 hover:fill-white mr-3'
                            onClick={toggleSearch}></MagnifyingGlassIcon>
                        <Bars3Icon className='fill-main h-8 cursor-pointer transition-colors duration-300 hover:fill-white' onClick={toggleSideNav}></Bars3Icon>
                        <label htmlFor="side-nav-drawer" className="drawer-button hidden" ref={drawerButton}>Open drawer</label>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <SideNavBar>
            {nav}
            {props.children}
        </SideNavBar>
    );
}

export default NavBar;
