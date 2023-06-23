import Comment from "@/interfaces/commentInterface";
import { fetchUserComments } from "@/services/review/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import useStore from "@/utils/useStore";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Pagination } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SortProps } from "../product/ProductListPage";
import CommentBlock from "../review/CommentBlock";

const CommentList = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [totalComments, setTotalComments] = useState(0);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const user = useStore(useAuthStore, (state) => state.loggedInUser)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getComments = async (page: number, sortCategory: SortProps) => {
        if (user) {
            loadingHandler.open();
            try {
                const response = await fetchUserComments(
                    user?.id,
                    page,
                    sortCategory.by,
                    sortCategory.direction
                );

                if (response && response.data && response.data.commentList) {
                    setComments(response.data.commentList);
                    console.log(response.data.commentList)
                    setTotalComments(response.data.totalComments);
                    setTotalPage(response.data.totalPages);
                } else {
                    setComments([]);
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
        getComments(1, sortCategory);
    }, [sortCategory, user])

    // On page change
    useEffect(() => {
        getComments(page, sortCategory);
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
                        <ChatBubbleLeftRightIcon className='w-12 mr-3'></ChatBubbleLeftRightIcon>
                        <div>
                            My Comments
                        </div>
                        <div className="text-4xl ml-3 self-center">{"(" + totalComments + ")"}</div>
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
                <div className="flex flex-col gap-10 mt-5">
                    {
                        comments.length > 0 ?
                            comments.map((comment) => {
                                return <div className="border-b-2 border-main/40 pb-5 flex flex-col" key={comment.commentId}>
                                    <CommentBlock comment={comment}
                                        refreshFunction={() => {
                                            getComments(page, sortCategory);
                                        }}
                                    ></CommentBlock>
                                    <Link href={"/products/details/" + comment.productId + "/#" + comment.reviewId}
                                        className="text-sm mr-8 rounded border p-2 px-3 -mt-3 border-main self-end">
                                        View parent review
                                    </Link>
                                </div>
                            }) :
                            <div>No comments yet!</div>
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

export default CommentList