import { RefObject, useEffect } from "react";

export interface outsideAlerterProps {
    ref: RefObject<HTMLDivElement>,
    isOpen: boolean,
    // If function type is toggling, can straight pass in.
    // If need to define params, then need to pass in as () => { function() }
    setFunction: (...args: any[]) => void
}

const OutsideAlerter = (props: outsideAlerterProps) => {
    useEffect(() => {
        if (props.isOpen) {
            const handleClickOutside = (event: { target: any; }) => {
                if (props.ref != null) {
                    if (props.ref.current && !props.ref.current!.contains(event.target)) {
                        props.setFunction();
                    }
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [props.ref, props.isOpen]);
}

export default OutsideAlerter;