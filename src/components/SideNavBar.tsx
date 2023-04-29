import { ReactNode } from 'react';

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
                <ul className="menu p-4 w-80 bg-white text-base-content text-gray-dark">
                    {/* <!-- Sidebar content here --> */}
                    <li>Home</li>
                    <li>Product</li>
                </ul>
            </div>
        </div>
    );
}

export default SideNavBar;
