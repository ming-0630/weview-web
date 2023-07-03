import Unverified from "@/components/ui/Unverified";
import User from "@/interfaces/userInterface";
import { getUserProfile } from "@/services/user/services";
import { useGlobalStore } from "@/states/globalStates";
import { PencilIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Input, Tabs, Tooltip } from "@mantine/core";
import Image from 'next/image';
import { useEffect, useState } from "react";
import blankUserImage from '../../../assets/blank_user.png';
import ReviewBlock from "../review/ReviewBlock";
import RatingBreakdown from "@/components/ui/RatingBreakdown";
import { SortProps } from "../product/ProductListPage";
import Review from "@/interfaces/reviewInterface";
import dayjs from "dayjs";

interface ProfileProps {
    id: string | string[]
}

const Profile = (props: ProfileProps) => {
    const [user, setUser] = useState<User>()
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "asc" });
    const [reviews, setReviews] = useState<Review[]>();

    const getUserDetails = async () => {
        if (props.id) {
            loadingHandler.open();
            try {
                const response = await getUserProfile(props.id.toString());

                if (response && response.data) {
                    setUser(response.data)
                    setReviews(response.data.reviews)
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingHandler.close();
            }
        }
    }


    useEffect(() => {
        getUserDetails();
    }, [props.id])


    useEffect(() => {
        if (!reviews) {
            return;
        }

        if (sortCategory.by == "votes") {
            const sortedReviews = [...reviews].sort((a, b) => {
                if (sortCategory.direction == "desc") {
                    return a.votes! - b.votes!;
                } else {
                    return b.votes! - a.votes!;
                }
            });
            setReviews(sortedReviews);
            return;
        }

        if (sortCategory.by == "dateCreated") {
            const sortedReviews = [...reviews].sort((a, b) => {
                if (sortCategory.direction == "asc") {
                    return dayjs(a.date_created!).isAfter(dayjs(b.date_created!)) ? -1 : 1;
                } else {
                    return dayjs(a.date_created!).isAfter(dayjs(b.date_created!)) ? 1 : -1;
                }
            });
            setReviews(sortedReviews);
            return;
        }

        if (sortCategory.by == "rating") {
            const sortedReviews = [...reviews].sort((a, b) => {
                if (sortCategory.direction == "asc") {
                    return a.rating! - b.rating!;
                } else {
                    return b.rating! - a.rating!;
                }
            });
            setReviews(sortedReviews);
            return;
        }
    }, [sortCategory])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col">
                <div className="flex">
                    <div className="flex items-center">
                        <div className="relative w-16 h-16 border border-main rounded-full mr-5">
                            <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                        </div>
                        <div>
                            <div className="flex items-center" >
                                <div className="text-main font-bold text-5xl">{user?.username}</div>
                                <div className="ml-5">
                                    {user && user.isVerified ?
                                        <Tooltip label="Verified!" withArrow>
                                            <CheckBadgeIcon className="w-5 text-main -mb-0.5  scale-150"></CheckBadgeIcon>
                                        </Tooltip>
                                        : <Tooltip label="Unverified!">
                                            <div className="cursor-pointer group scale-150">
                                                <Unverified></Unverified>
                                            </div>
                                        </Tooltip>
                                    }
                                </div>
                            </div>
                            <div className="text-gray-500">{(user?.reviews?.length ?? 0) + " Reviews"}</div>
                        </div>
                    </div>

                </div>
                <div className="mt-5 flex gap-5 items-center">
                    <div className="flex flex-col gap-2 grow bg-white w-[5vw]" data-theme="corporate">
                        <div className="stats stats-vertical bg-white text-main border border-main rounded-lg">
                            <div className="stat">
                                <div className='font-semibold text-gray-600 text-lg'>User Breakdown</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title text-main">Total Upvotes</div>
                                <div className="stat-value">{user?.totalUpvotes ?? "-"}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title text-main">Total Downvotes</div>
                                <div className="stat-value">{user?.totalDownvotes ?? "-"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="grow">
                        <RatingBreakdown ratingList={user?.reviews ? user.reviews.map(x => x.rating!) : undefined}></RatingBreakdown>
                    </div>
                </div>
                <div className="flex mt-5">
                    <Tabs defaultValue="reviewList" className="w-full">
                        <Tabs.List>
                            <Tabs.Tab value="reviewList" icon={<PencilIcon className="w-3"></PencilIcon>}>Reviews</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="reviewList" pt="xs" className="flex flex-col">
                            <div className="flex flex-col mt-5" id="review-list">
                                <div data-theme="cupcake" className="flex items-center mr-5 self-end">
                                    <label className="mr-3 text-md xl:text-lg">Sort By:</label>
                                    <select
                                        title="Sort by: "
                                        className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                                                focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                        value={JSON.stringify(sortCategory)}
                                        onChange={e => setSortCategory(JSON.parse(e.target.value))}
                                    >
                                        <option value={JSON.stringify({ by: "dateCreated", direction: "asc" })}>Newest</option>
                                        <option value={JSON.stringify({ by: "dateCreated", direction: "desc" })}>Oldest</option>
                                        <option value={JSON.stringify({ by: "votes", direction: "asc" })}>Most Upvotes</option>
                                        <option value={JSON.stringify({ by: "votes", direction: "desc" })}>Most Downvotes</option>
                                        <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Highest Rating</option>
                                        <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Lowest Rating</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                {
                                    reviews && reviews.map(review => {
                                        return (
                                            <div key={review.reviewId} className="border-b-2 border-main/40 pb-5 mt-5 last:border-b-0">
                                                <ReviewBlock review={review} user={review.user}></ReviewBlock>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Profile