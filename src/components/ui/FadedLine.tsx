import classNames from 'classnames';
import Line from '../../assets/faded-line.svg';
import Image from "next/image"

export interface FadedLineProps {
    className?: string;
}

const FadedLine = (props: FadedLineProps) => {
    return (
        <div className={classNames("relative w-[45%] h-2", props.className)}>
            <Image src={Line} fill alt={""}></Image>
        </div>
    )
}

export default FadedLine 