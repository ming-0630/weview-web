import { Reward } from "@/interfaces/rewardInterface";
import { useGlobalStore } from "@/states/globalStates";
import { FireIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import WeViewLogo from '/public/favicon.ico';

export interface RewardCardProps {
    reward: Reward;
    handleRedeem: (...args: any[]) => void
}

const RewardCard = (props: RewardCardProps) => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)

    return (
        <div className="border-main border-2 rounded-lg w-52 h-52 flex flex-col hover:scale-105 cursor-pointer transition"
            onClick={() => {
                toggleConfirm({
                    title: "Confirm redeem?",
                    description: "Are you sure you want redeem " + props.reward.name + " for " + props.reward.points + " points?",
                    onClickYes: props.handleRedeem
                })
            }}
        >
            <div className="grow relative">
                <Image src={props.reward.image ?? WeViewLogo} alt="Reward image" fill className="object-contain p-1" />
            </div>
            <div className="basis-1/3 p-3 bg-main font-bold text-white">{props.reward.name}</div>
            <div className="rounded-b py-1 px-5 text-main w-full flex justify-end">
                <div className="flex">
                    <FireIcon className="w-5 mr-2"></FireIcon>
                    {props.reward.points}
                </div>
            </div>
        </div>
    )
}

export default RewardCard