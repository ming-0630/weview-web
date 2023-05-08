import { CubeIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';
import NavItem from './NavItem';

export interface SearchModalProps {
    children?: ReactNode
}

const SideNavBar = (props: SearchModalProps) => {
    return (
        <div className="drawer drawer-end absolute overflow-y-auto">
            <input id="side-nav-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {props.children}
            </div>
            <div className="drawer-side">
                <label htmlFor="side-nav-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 lg:w-[21rem] bg-white text-base-content text-gray-dark">
                    {/* <!-- Sidebar content here --> */}
                    <div className='flex justify-center mt-3'>
                        <button className='btn btn-primary mr-4 text-white'>Login</button>
                        <button className='btn btn-outline btn-primary hover:text-white'>Register</button>
                    </div>
                    <div className='pt-10'>
                        <NavItem
                            title='Home'
                            href={'/'}
                            icon={<HomeIcon className='w-14'></HomeIcon>}
                        ></NavItem>
                        <NavItem
                            title='Products'
                            href={'/product-list-page'}
                            icon={<CubeIcon className='w-14'></CubeIcon>}
                        ></NavItem>
                        <div className="collapse bg-black">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                Click me to show/hide content
                            </div>
                            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                <p>hello</p>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default SideNavBar;
