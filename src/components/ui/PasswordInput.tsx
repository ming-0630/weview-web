import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export interface PasswordInputProps {
    isRepeat?: boolean;
    classnames?: string;
    value?: string;
    onChange?: (...args: any) => void
}

const PasswordInput = (props: PasswordInputProps) => {
    const showHidePasswordClasses = classNames("w-5 absolute right-5 bottom-3.5 cursor-pointer")

    const [isShow, setIsShow] = useState(false);

    return (
        <div className={classNames("flex flex-col", props.classnames)}>
            <label className="mb-1">{props.isRepeat ? "Repeat Password" : "Password"}</label>
            <div className="relative">
                <input type={isShow ? "text" : "password"}
                    placeholder="Password"
                    className={"input input-primary input-md input-bordered bg-white w-full"}
                    value={props.value}
                    onChange={props.onChange} />
                {isShow ? <EyeIcon className={showHidePasswordClasses} onClick={() => { setIsShow(!isShow) }}></EyeIcon>
                    : <EyeSlashIcon className={showHidePasswordClasses} onClick={() => { setIsShow(!isShow) }}></EyeSlashIcon>
                }
            </div>
        </div>
    )
}

export default PasswordInput 
