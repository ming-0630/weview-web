import { FlagIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import blankUserImage from '../../../assets/blank_user.png'
import User from "@/interfaces/userInterface";
import Accordion from "@/components/ui/Accordion";
import CommentBlock from "./CommentBlock";
import Review from "@/interfaces/reviewInterface";
import dayjs from "dayjs";
import { Rating } from "@mantine/core";
import UpvoteDownvote from "@/components/ui/UpvoteDownvote";
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/states/authStates";
import { useDisclosure } from "@mantine/hooks";
import CustomToastError from "@/utils/CustomToastError";
import { useGlobalStore } from "@/states/globalStates";
import { addComment, deleteReviewAPI, getComments } from "@/services/review/services";
import Comment from "@/interfaces/commentInterface";
import { TrashIcon } from "@heroicons/react/24/outline";
import useStore from "@/utils/useStore";
import { toast } from "react-toastify";

export interface ReviewBlockProps {
    className?: string;
    user?: User;
    review?: Review;
    isPreview?: boolean;
    refreshFunction?: (...args: any[]) => void
}

const ReviewBlock = (props: ReviewBlockProps) => {
    const [commentsPage, setCommentsPage] = useState(0);
    const [commentsHasNext, setCommentsHasNext] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const [newComment, setNewComment] = useState("");

    const user = useStore(useAuthStore, ((state) => state.loggedInUser))
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    useEffect(() => {
        setComments([]);
        if (commentsPage > 0) {
            handleGetComments(1);
        }
    }, [props.review])

    const handleGetComments = async (page: number) => {
        if (props.review) {
            const response = await getComments(props.review.reviewId!, page)

            if (response && response.data) {
                setComments((prevComments) => [...prevComments, ...response.data.commentList]);
                setCommentsPage(response.data.currentPage);
                setCommentsHasNext(response.data.hasNext);
            }
        }
    }

    const submitComment = async () => {
        loadingHandler.open();
        if (!user) {
            CustomToastError("Please login to write a comment");
            toggleLogin();
            loadingHandler.close();
            return;
        }

        if (!newComment) {
            CustomToastError("Cannot submit empty comment");
            loadingHandler.close();
            return;
        }

        if (props.review && props.review.reviewId) {

            const response = await addComment(newComment, props.review.reviewId, user.id)

            if (response && response.status == 200) {
                setCommentsPage(1);
                setComments([]);
                handleGetComments(1);
                setNewComment("");
            }
        }

        loadingHandler.close()
    }

    const handleDeleteReview = () => {
        toggleConfirm({
            title: "Confirm Delete?",
            description: "Are you sure you want to delete this review?",
            onClickYes: () => { deleteReview(); toggleConfirm(); }
        });
    }

    const deleteReview = async () => {
        try {
            loadingHandler.open();
            if (props.review) {
                const response = await deleteReviewAPI(props.review.reviewId!)

                if (response && response.status == 200) {
                    toast.success("Deleted successfully");
                    // window.location.reload();
                    if (props.refreshFunction) {
                        props.refreshFunction();
                    }
                }
            }
        } finally {
            loadingHandler.close()
        }
    }

    const handleReport = () => {
        console.log(props.review)
        console.log(user)
    }

    return (
        <div className="flex gap-10">
            <div className="flex flex-col items-center gap-2">
                <UpvoteDownvote reviewId={props.review?.reviewId} intialVotes={props.review?.votes}
                    currentUserVote={props.review?.currentUserVote}
                ></UpvoteDownvote>
                {
                    props.review?.user?.id == user?.id ?
                        <TrashIcon className="w-5 text-red-500 cursor-pointer" onClick={handleDeleteReview}></TrashIcon>
                        : <FlagIcon className="w-5 text-red-500 cursor-pointer" onClick={handleReport}></FlagIcon>
                }

            </div>
            <div className="grow flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                    <Rating
                        value={props.review?.rating ?? 3}
                        readOnly
                    />
                    <div className="text-main font-semibold italic text-2xl">{props.review?.title || 'Incredible on Paper, Weak on Execution.'}</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 border border-main rounded-full">
                            <Image src={props.user && props.user.userImage ? props.user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                        </div>
                        <div className="text-main text-lg">{props.user && props.user.username}</div>
                    </div>

                    <div className="text-gray-500 text-sm">{
                        props.review?.date_created ?
                            dayjs(props.review?.date_created).format('D MMMM YYYY') : dayjs(Date.now()).format('D MMMM YYYY')
                    }
                    </div>
                </div>

                <pre style={{ whiteSpace: 'pre-wrap' }} className="text-justify font-sans text-sm">
                    {props.review?.description || `
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales magna at enim posuere condimentum. Curabitur aliquet aliquet tellus a aliquet. Aenean scelerisque lectus consectetur ante pretium, eu tincidunt ante feugiat. Cras porta eget dolor sed porta. Ut tempus magna at neque vulputate, nec interdum neque convallis. Donec eget elementum felis, non hendrerit sem. Maecenas semper, ipsum id venenatis porta, felis sapien interdum nulla, et vulputate odio justo sit amet lorem. Praesent eu velit rhoncus, euismod massa sit amet, luctus tortor. Nullam nec lobortis metus, et interdum est. Donec pretium lacus vitae fringilla efficitur. Suspendisse potenti. Quisque nec nunc eu ex semper blandit. Nunc et ante ex.

                    Nulla vel convallis est. Vivamus hendrerit scelerisque consectetur. In mattis urna condimentum facilisis bibendum. Praesent vel risus ullamcorper, auctor sapien id, tristique leo. Nunc volutpat nulla a magna ullamcorper sodales. Aenean erat velit, luctus eu est sit amet, facilisis mollis sem. Praesent eu lectus a nulla tempor consequat sed ornare nibh. Morbi maximus faucibus nunc et imperdiet. Nulla facilisi. Donec aliquet ligula et nunc dignissim, ac rutrum sapien sagittis. Vivamus luctus interdum orci, nec sagittis purus scelerisque quis. Sed ultrices eget lacus quis maximus. In hac habitasse platea dictumst.

                    Vestibulum sed ullamcorper neque. Nullam posuere vitae felis nec hendrerit. Suspendisse eget accumsan mauris, ac malesuada purus. Aenean et imperdiet lectus, at vulputate sapien. Integer in dui iaculis, dictum elit et, ullamcorper mi. Nam varius nulla aliquam vulputate lacinia. Curabitur vulputate urna et commodo feugiat. Nunc vel nibh eget arcu malesuada sodales vehicula ut tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat.`}
                </pre>

                <div className="flex flex-wrap gap-3">
                    {props.isPreview ?
                        props.review?.tempImages?.map((img, i) => {
                            return <div className="relative w-[10vw] h-[20vh]" key={i}>
                                <Image src={URL.createObjectURL(img)} alt={""} fill className="object-cover"></Image>
                            </div>
                        }) :
                        props.review?.images?.map((img, i) => {
                            return <div className="relative w-[10vw] h-[20vh]" key={i}>
                                <Image src={img} alt={""} fill className="object-cover"></Image>
                            </div>
                        })}
                </div>
                <Accordion title={"View comments " + "(" + props.review?.commentCount + ")"}
                    disabled={props.isPreview}
                    onClick={() => { comments.length > 0 ? setComments([]) : handleGetComments(1) }}
                >
                    <div className="p-10 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="flex gap-5">
                                <div className="relative w-10 h-10 border border-main rounded-full">
                                    <Image src={user && user.userImage ? user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                                </div>
                                <InputTextarea
                                    placeholder="Add a comment"
                                    className="w-full bg-transparent !h-full"
                                    autoResize
                                    rows={2}
                                    value={newComment}
                                    onChange={(e) => { setNewComment(e.target.value) }} />
                            </div>
                            <Button className="w-[8vw] mt-3 self-end" onClick={submitComment}>Comment</Button>
                        </div>
                        {
                            comments.length > 0 ?
                                comments.map((comment: Comment) => {
                                    return (
                                        <CommentBlock comment={comment} key={comment.commentId}></CommentBlock>)
                                }) :
                                <div className="m-auto">No comments yet!</div>
                        }
                        {
                            commentsHasNext && <div
                                onClick={() => handleGetComments(commentsPage + 1)}
                                className="text-sm cursor-pointer m-auto"

                            >Load more comments...</div>
                        }
                    </div>

                </Accordion>
            </div>

        </div>
    )
}

export default ReviewBlock