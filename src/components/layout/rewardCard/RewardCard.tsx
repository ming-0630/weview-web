import { Reward } from "@/interfaces/rewardInterface";
import { useGlobalStore } from "@/states/globalStates";
import { FireIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import WeViewLogo from '/public/favicon.ico';
import classNames from "classnames";

export interface RewardCardProps {
    reward: Reward;
    handleRedeem?: (...args: any[]) => void
    isPreview?: boolean
    previewImage?: string
}

const RewardCard = (props: RewardCardProps) => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)

    return (props.reward &&
        <div className={classNames("border-main border-2 rounded-lg w-52 h-52 flex flex-col",
            !props.isPreview && "hover:scale-105 cursor-pointer transition")}
            onClick={() => {
                !props.isPreview &&
                    toggleConfirm({
                        title: "Confirm redeem?",
                        description: "Are you sure you want redeem " + props.reward.name + " for " + props.reward.points + " points?",
                        onClickYes: props.handleRedeem
                    })
            }}
        >
            <div className="grow relative">
                <Image src={props.previewImage ? props.previewImage : (props.reward.image ?? WeViewLogo)}
                    alt="Reward image" fill className="object-contain p-1" />
            </div>
            <div className="basis-1/3 p-3 bg-main font-bold text-white">{props.reward.name}</div>
            <div className="rounded-b py-1 px-5 text-main w-full flex justify-between">
                <div className="flex">
                    <RectangleStackIcon className="w-5 mr-2"></RectangleStackIcon>
                    {props.reward.codeCount}
                </div>
                <div className="flex text-orange-500">
                    <FireIcon className="w-5 mr-2"></FireIcon>
                    {props.reward.points}
                </div>
            </div>
        </div>
    )
}

export default RewardCard