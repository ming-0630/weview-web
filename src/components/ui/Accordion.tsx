import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import { ReactNode, useState } from "react";

export interface AccordionProps {
    title?: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (...args: any[]) => any;
}

const Accordion = (props: AccordionProps) => {
    const [isShow, setIsShow] = useState(false);

    const toggleIsShow = () => {
        if (!props.disabled) {
            setIsShow(!isShow);

            if (props.onClick) {
                props.onClick();
            }
        }
    }

    return (
        <div>
            <div className={classNames("flex gap-3 p-3 text-main text-sm", !props.disabled && "cursor-pointer")} onClick={toggleIsShow}>
                {props.title}
                {
                    isShow ? <ChevronUpIcon className="w-4"></ChevronUpIcon> : <ChevronDownIcon className="w-4"></ChevronDownIcon>
                }
            </div>
            <div hidden={!isShow} className="shadow-[1px_2px_3px_1px_rgba(0,0,0,0.25)] rounded-lg">
                {props.children}</div>
        </div>

    )
}

export default Accordion 