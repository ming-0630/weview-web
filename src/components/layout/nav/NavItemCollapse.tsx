import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { ReactNode } from "react";

export interface NavItemProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

const NavItemCollapse = (props: NavItemProps) => {
    return (
        <div tabIndex={0} className="collapse collapse-arrow !visible 
        rounded-lg font-medium 
        focus:bg-main/10 focus:text-main">
            <div className="collapse-title flex items-center p-2 rounded-lg
            hover:bg-main/10 hover:text-main">
                {props.icon}
                {props.title}
            </div>
            <div className="collapse-content rounded-lg mt-3 text-black">
                <div tabIndex={0}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default NavItemCollapse