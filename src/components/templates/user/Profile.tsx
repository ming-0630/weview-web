import RatingBreakdown from "@/components/ui/RatingBreakdown";
import Unverified from "@/components/ui/Unverified";
import Review from "@/interfaces/reviewInterface";
import User from "@/interfaces/userInterface";
import { fetchReviews, fetchUserComments } from "@/services/review/services";
import { getUserProfile } from "@/services/user/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import { ChatBubbleLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Pagination, Tabs, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import blankUserImage from '../../../assets/blank_user.png';
import { SortProps } from "../product/ProductListPage";
import CommentBlock from "../review/CommentBlock";
import ReviewBlock from "../review/ReviewBlock";
import Comment from "@/interfaces/commentInterface";

interface ProfileProps {
    id: string | string[]
}

const Profile = (props: ProfileProps) => {
    const [user, setUser] = useState<User>()
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const toggleUpload = useGlobalStore((state) => state.toggleUpload)
    const { loggedInUser } = useAuthStore();
    const toggleVerify = useGlobalStore((state) => state.toggleVerify)

    const [activeTab, setActiveTab] = useState<string | null>('reviews');
    const [reviewsPage, setReviewsPage] = useState(1);
    const [commentsPage, setCommentsPage] = useState(1);
    const [reviewsTotalPage, setReviewsTotalPage] = useState(1);
    const [commentsTotalPage, setCommentsTotalPage] = useState(1);
    const [reviewsSortCategory, setReviewsSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [commentsSortCategory, setCommentsSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });

    const [reviews, setReviews] = useState<Review[]>();
    const [comments, setComments] = useState<Comment[]>([]);

    const getUserDetails = async () => {
        if (props.id) {
            loadingHandler.open();
            try {
                const response = await getUserProfile(props.id.toString());

                if (response && response.data) {
                    setUser(response.data)
                    setReviews(response.data.reviews)
                    setReviewsTotalPage(response.data.reviewsTotalPage)
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingHandler.close();
            }
        }
    }

    const getReviews = async (page: number) => {
        if (user) {
            loadingHandler.open();
            try {
                const response = await fetchReviews(
                    user?.id,
                    page,
                    reviewsSortCategory.by,
                    reviewsSortCategory.direction
                );

                if (response && response.data && response.data.reviewList) {
                    setReviews(response.data.reviewList);
                    setReviewsPage(response.data.currentPage);
                    setReviewsTotalPage(response.data.totalPages);
                    scrollToTop();
                } else {
                    setReviews([]);
                    setReviewsTotalPage(0);
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingHandler.close();
            }
        }
    }

    const getComments = async (page: number) => {
        if (user) {
            loadingHandler.open();
            try {
                const response = await fetchUserComments(
                    user?.id,
                    page,
                    commentsSortCategory.by,
                    commentsSortCategory.direction
                );

                if (response && response.data && response.data.commentList) {
                    setComments(response.data.commentList);
                    setCommentsPage(response.data.currentPage);
                    setCommentsTotalPage(response.data.totalPages);
                    scrollToTop();
                } else {
                    setComments([]);
                    setCommentsTotalPage(0);
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingHandler.close();
            }
        }
    }

    const scrollToTop = () => {
        const element = document.getElementById("user-tabs");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [props.id, loggedInUser])

    useEffect(() => {
        getReviews(reviewsPage);
    }, [reviewsPage])

    useEffect(() => {
        getComments(commentsPage);
    }, [commentsPage])

    useEffect(() => {
        if (comments.length == 0) {
            getComments(1);
            return;
        }
    }, [activeTab])


    useEffect(() => {
        getReviews(1);
    }, [reviewsSortCategory])

    useEffect(() => {
        getComments(1);
    }, [commentsSortCategory])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col">
                <div className="flex">
                    <div className="flex items-center">
                        {
                            loggedInUser?.id == user?.id ?
                                <div className="rounded-full border-gray-300 border-2 ml-4 mr-6 w-14 h-14 relative cursor-pointer hover:brightness-90"
                                    onClick={toggleUpload}
                                >
                                    <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                                </div> :
                                < div className="relative w-16 h-16 border border-main rounded-full mr-5">
                                    <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                                </div>

                        }
                        <div>
                            <div className="flex items-center" >
                                <div className="text-main font-bold text-5xl">{user?.username}</div>
                                <div className="ml-5">
                                    {user && user.isVerified ?
                                        <Tooltip label="Verified!" withArrow>
                                            <CheckBadgeIcon className="w-5 text-main -mb-0.5  scale-150"></CheckBadgeIcon>
                                        </Tooltip>
                                        : loggedInUser?.id == user?.id ?
                                            <Tooltip label="Click here to verify your account!" withArrow
                                                onClick={toggleVerify}>
                                                <div className="cursor-pointer group scale-150">
                                                    <Unverified></Unverified>
                                                </div>
                                            </Tooltip>
                                            :
                                            <Tooltip label="Unverified!">
                                                <div className="cursor-pointer group scale-150">
                                                    <Unverified></Unverified>
                                                </div>
                                            </Tooltip>
                                    }
                                </div>
                            </div>
                            <div className="text-gray-500">{(user?.totalReviews ?? 0) + " Reviews"}</div>
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
                {
                    activeTab == "reviews" ?
                        <div className="flex flex-col mt-10" id="user-tabs">
                            <div data-theme="cupcake" className="flex items-center mr-5 self-end">
                                <select
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                                                focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={JSON.stringify(reviewsSortCategory)}
                                    onChange={e => setReviewsSortCategory(JSON.parse(e.target.value))}
                                >
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "desc" })}>Newest</option>
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "asc" })}>Oldest</option>
                                    <option value={JSON.stringify({ by: "votes", direction: "asc" })}>Most Upvotes</option>
                                    <option value={JSON.stringify({ by: "votes", direction: "desc" })}>Most Downvotes</option>
                                    <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Highest Rating</option>
                                    <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Lowest Rating</option>
                                </select>
                            </div>
                        </div> :
                        <div className="flex flex-col mt-10" id="user-tabs">
                            <div data-theme="cupcake" className="flex items-center mr-5 self-end">
                                <select
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={JSON.stringify(commentsSortCategory)}
                                    onChange={e => setCommentsSortCategory(JSON.parse(e.target.value))}
                                >
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "desc" })}>Newest</option>
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "asc" })}>Oldest</option>
                                </select>
                            </div>
                        </div>
                }
                <div className="flex mt-5 flex-col">
                    <Tabs className="w-full" value={activeTab} onTabChange={setActiveTab}>
                        <Tabs.List>
                            <Tabs.Tab value="reviews" icon={<PencilIcon className="w-3"></PencilIcon>}>Reviews</Tabs.Tab>
                            <Tabs.Tab value="comments" icon={<ChatBubbleLeftIcon className="w-3"></ChatBubbleLeftIcon>}>Comments</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="reviews" pt="xs">
                            <div className="flex flex-col">
                                {
                                    reviews && reviews?.length > 0 ?
                                        reviews.map(review => {
                                            return (
                                                <div className="border-b-2 border-main/40 pb-5 mt-5 flex flex-col" key={review.reviewId}>
                                                    <Link href={"/products/details/" + review.productId + "#" + review.reviewId}
                                                        className="text-sm rounded border p-2 px-3 mb-3 border-main self-end hover:bg-gray-200">
                                                        View product
                                                    </Link>
                                                    <ReviewBlock review={review} user={review.user} refreshFunction={() => getReviews(1)}></ReviewBlock>

                                                </div>
                                            )
                                        }) :
                                        <div>No reviews yet!</div>
                                }
                                <div className="my-10 mx-auto">
                                    <Pagination value={reviewsPage} onChange={(val) => { setReviewsPage(val) }} total={reviewsTotalPage}
                                        radius={'xl'}
                                        boundaries={5}
                                        classNames={{ control: 'border-transparent' }}
                                    />
                                </div>
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="comments" pt="xs">
                            <div className="flex flex-col">
                                {
                                    comments.length > 0 ?
                                        comments.map((comment) => {
                                            return <div className="border-b-2 border-main/40 pt-5 pb-3 flex flex-col" key={comment.commentId}>
                                                <Link href={"/products/details/" + comment.productId + "/#" + comment.reviewId}
                                                    className="text-sm mr-8 rounded border p-2 px-3 border-main self-end hover:bg-gray-200">
                                                    View parent review
                                                </Link>
                                                <CommentBlock comment={comment}
                                                    refreshFunction={() => getComments(1)}
                                                ></CommentBlock>

                                            </div>
                                        }) :
                                        <div>No comments yet!</div>
                                }
                                <div className="my-10 mx-auto">
                                    <Pagination value={commentsPage} onChange={(val) => { setCommentsPage(val) }} total={commentsTotalPage}
                                        radius={'xl'}
                                        boundaries={5}
                                        classNames={{ control: 'border-transparent' }}
                                    />
                                </div>
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}

export default Profile