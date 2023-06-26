
import { GiftIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { SortProps } from "../product/ProductListPage";
import { Pagination } from "@mantine/core";
import useStore from "@/utils/useStore";
import { useAuthStore } from "@/states/authStates";
import Review from "@/interfaces/reviewInterface";
import ReviewBlock from "../review/ReviewBlock";
import { fetchReviews } from "@/services/review/services";
import { useGlobalStore } from "@/states/globalStates";
import RewardCard from "@/components/layout/rewardCard/RewardCard";
import { fetchRewards } from "@/services/admin/services";
import { Reward } from "@/interfaces/rewardInterface";
import CustomToastError from "@/utils/CustomToastError";
import { redeemReward } from "@/services/user/services";
import { toInteger } from "lodash";

const Rewards = () => {

    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [page, setPage] = useState(1);
    const [rewards, setRewards] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const { loggedInUser, setCurrentUser } = useAuthStore();

    const handleRedeem = async (reward: Reward) => {
        loadingHandler.open();

        if (reward.points && loggedInUser?.points && reward.id) {
            if (loggedInUser?.points < toInteger(reward.points)) {
                CustomToastError("Insufficient points!")
                toggleConfirm();
                loadingHandler.close();
                return;
            }

            if (!reward.codeCount || reward.codeCount <= 0) {
                CustomToastError("No codes left!")
                toggleConfirm();
                loadingHandler.close();
                return;
            }


            const response = await redeemReward(reward.id)

            if (response && response.data) {
                toggleConfirm();
                loggedInUser.points = response.data.user.points
                setCurrentUser(loggedInUser)
                getRewards();
                toggleConfirm({
                    title: "Thank you for your redemption!",
                    children: (
                        <div className="flex flex-col">
                            <div>{"Here is your promo code: "}
                                <span className="font-bold text-main">{response.data.code}</span>
                            </div>
                            <div>{'This is a one-time-use code. Please save it somewhere safe!'}</div>
                            <div className="mt-3">{"Your remaining balance is: "}
                                <span className="font-bold text-yellow-500">{response.data.user.points}</span>
                            </div>
                        </div>
                    ),
                    isNotifying: true
                })
            }

        }
        loadingHandler.close();
    }

    const getRewards = async () => {
        try {
            loadingHandler.open();
            const response = await fetchRewards(page);

            if (response && response.data) {
                console.log(response.data)
                if (response.data) {
                    setTotalPage(response.data.totalPage)
                    setRewards(response.data.rewards)
                }
            }

        } finally {
            loadingHandler.close();
        }
    }

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    // On page change
    useEffect(() => {
        getRewards()
    }, [page])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-main font-bold text-5xl flex items-center justify-center">
                        <GiftIcon className='w-12 mr-3'></GiftIcon>
                        <div>
                            Redeem Rewards
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <div data-theme="cupcake" className="flex items-center mr-5">
                                <select
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={JSON.stringify(sortCategory)}
                                    onChange={e => setSortCategory(JSON.parse(e.target.value))}
                                >
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "desc" })}>Newest</option>
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "asc" })}>Oldest</option>
                                    <option value={JSON.stringify({ by: "votes", direction: "asc" })}>Most Upvotes</option>
                                    <option value={JSON.stringify({ by: "votes", direction: "desc" })}>Most Downvotes</option>
                                    <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Highest Rating</option>
                                    <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Lowest Rating</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 mt-8">
                    <div className="flex">
                        {rewards.map((reward: Reward) => {
                            return (<RewardCard reward={reward} key={reward.id} handleRedeem={() => handleRedeem(reward)}></RewardCard>)
                        })}

                    </div>
                </div>
                <div className="my-10 mx-auto">
                    <Pagination value={page} onChange={handlePageChange} total={totalPage}
                        radius={'xl'}
                        boundaries={5}
                        classNames={{ control: 'border-transparent' }}
                    />
                </div>
            </div>
        </div >
    )
}

export default Rewards