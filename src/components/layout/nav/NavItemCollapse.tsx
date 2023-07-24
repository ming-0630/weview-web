import { useGlobalStore } from "@/states/globalStates";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export interface NavItemProps {
    title: string;
    icon: ReactNode;
    className?: string;
    children: ReactNode;
}


const NavItemCollapse = (props: NavItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navIsOpen = useGlobalStore((state) => state.navIsOpen)

    useEffect(() => {
        if (!navIsOpen) {
            setIsOpen(false);
        }
    }, [navIsOpen])

    const toggleOpen = () => {
        setIsOpen((prev) => { return !prev })
    }

    return (
        <div className={classNames("collapse collapse-arrow !visible rounded-lg font-medium", !isOpen && "hover:bg-main/10 hover:text-main")} onClick={toggleOpen}>
            <input type="checkbox" className="peer" checked={isOpen} onChange={() => { }} />
            <div className={classNames("collapse-title flex items-center px-2 py-0 rounded-lg", isOpen && "bg-main/10 text-main mb-3", props.className)}>
                {props.icon}
                {props.title}
            </div>
            <div className={classNames("collapse-content rounded-lg text-black")}>
                {props.children}
            </div>
        </div>
    )
}

export default NavItemCollapse