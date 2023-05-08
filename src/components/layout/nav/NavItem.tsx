import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { ReactNode } from "react";

export interface NavItemProps {
    href: Url;
    icon: ReactNode;
    title: string
}

const NavItem = (props: NavItemProps) => {
    return (
        <Link href={props.href}>
            <li className='rounded-lg flex flex-row items-center hover:bg-main/10 hover:text-main font-medium'>
                {props.icon}
                {props.title}
            </li>
        </Link>)
}

export default NavItem