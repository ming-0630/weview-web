
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { SortProps } from "../product/ProductListPage";
import { Pagination } from "@mantine/core";
import useStore from "@/utils/useStore";
import { useAuthStore } from "@/states/authStates";
import Review from "@/interfaces/reviewInterface";
import ReviewBlock from "../review/ReviewBlock";
import { fetchReviews } from "@/services/review/services";
import { useGlobalStore } from "@/states/globalStates";

const ReviewList = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const user = useStore(useAuthStore, (state) => state.loggedInUser)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getReviews = async (page: number, sortCategory: SortProps) => {
        if (user) {
            loadingHandler.open();
            try {
                const response = await fetchReviews(
                    user?.id,
                    page,
                    sortCategory.by,
                    sortCategory.direction
                );

                if (response && response.data && response.data.reviewList) {
                    setReviews(response.data.reviewList);
                    setTotalReviews(response.data.totalReviews);
                    setTotalPage(response.data.totalPages);
                } else {
                    setReviews([]);
                    setTotalPage(0);
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingHandler.close();
            }
        }
    }

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    useEffect(() => {
        setPage(1);
        getReviews(1, sortCategory);
    }, [sortCategory, user])

    // On page change
    useEffect(() => {
        getReviews(page, sortCategory);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-main font-bold text-5xl flex items-center justify-center">
                        <PencilSquareIcon className='w-12 mr-3'></PencilSquareIcon>
                        <div>
                            My Reviews
                        </div>
                        <div className="text-4xl ml-3 self-center">{"(" + totalReviews + ")"}</div>
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
                                    <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Highest Rating</option>
                                    <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Lowest Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 mt-8">
                    {
                        reviews.length > 0 ?
                            reviews.map((review, key) => {
                                return <div className="border-b-2 border-main/40 pb-5">
                                    <ReviewBlock review={review} key={key} user={review.user}
                                        refreshFunction={() => {
                                            getReviews(page, sortCategory)
                                        }}></ReviewBlock>
                                </div>
                            }) :
                            <div>No reviews yet!</div>
                    }
                </div>

                <div className="my-10 mx-auto">
                    <Pagination value={page} onChange={handlePageChange} total={totalPage}
                        radius={'xl'}
                        boundaries={5}
                        classNames={{ control: 'border-transparent' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReviewList