import { useGlobalStore } from "@/states/global-states";
import classNames from "classnames";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { ReactNode } from "react";

export interface NavItemProps {
    href: Url;
    icon: ReactNode;
    title: string;
    isNavItem?: boolean;
}

const NavItem = (props: NavItemProps) => {
    const toggleNav = useGlobalStore((state) => state.toggleNav)

    const hoverStyling = classNames(
        'rounded-lg p-2 flex flex-row items-center font-medium hover:text-main',
        props.isNavItem ?? 'hover:bg-main/10 hover:text-main'
    )

    return (
        <Link href={props.href} className="w-full" onClick={toggleNav}>
            <div className={hoverStyling}>
                {props.icon}
                {props.title}
            </div>
        </Link >)
}

export default NavItem