import Accordion from "@/components/ui/Accordion";
import Unverified from "@/components/ui/Unverified";
import UpvoteDownvote from "@/components/ui/UpvoteDownvote";
import Comment from "@/interfaces/commentInterface";
import Review from "@/interfaces/reviewInterface";
import User from "@/interfaces/userInterface";
import { addComment, deleteReviewAPI, getComments, getReport } from "@/services/review/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { FlagIcon as FlagIconForButton, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FlagIcon, InformationCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Rating, Tooltip } from "@mantine/core";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from 'next/image';
import { Image as PreviewImage } from 'primereact/image';
import { InputTextarea } from 'primereact/inputtextarea';
import { forwardRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import blankUserImage from '../../../assets/blank_user.png';
import CommentBlock from "./CommentBlock";
import Link from "next/link";
import { Knob } from "primereact/knob";

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

    const { loggedInUser } = useAuthStore();
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const toggleReport = useGlobalStore((state) => state.toggleReport)

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const toggleInspectReport = useGlobalStore((state) => state.toggleInspectReport)

    useEffect(() => {
        setComments([]);
        if (commentsPage > 0) {
            handleGetComments(1);
        }
    }, [props.review])

    const handleGetComments = async (page: number) => {
        if (props.review) {
            const response = await getComments(props.review.reviewId!, page)
            if (response && response.data && response.data.commentList.length > 0) {
                setComments(response.data.commentList);
                setCommentsPage(response.data.currentPage);
                setCommentsHasNext(response.data.hasNext);
            }
        }
    }

    const submitComment = async () => {
        loadingHandler.open();
        if (!loggedInUser) {
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

            const response = await addComment(newComment, props.review.reviewId, loggedInUser.id)

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
            if (props.review && !props.isPreview) {
                const response = await deleteReviewAPI(props.review.reviewId!)

                if (response && response.status == 200) {
                    toast.success("Deleted successfully");
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
        if (props.review && !props.isPreview) {
            toggleReport(props.review!.reviewId)
        }
    }

    /* eslint-disable react/display-name */
    const CustomKnob = forwardRef<HTMLDivElement>((innerProps, ref) => (
        <div ref={ref} className="cursor-pointer">
            {
                props.isPreview ?
                    <Knob value={props.review?.rating ? props.review?.rating * 20 : 0}
                        valueColor={props.review?.rating && props.review?.rating >= 4 ? "rgb(77 124 15)" :
                            (props.review?.rating && props.review?.rating <= 2 ? "rgb(194 65 12)" : "rgb(251 146 60)")}
                        className={"[&>svg>text]:!font-bold"}

                        readOnly size={45} /> :
                    <Knob value={props.review?.sentimentScore ? props.review?.sentimentScore : 0}
                        valueColor={props.review?.sentimentScore && props.review?.sentimentScore >= 65 ? "rgb(77 124 15)" :
                            (props.review?.sentimentScore && props.review?.sentimentScore <= 35 ? "rgb(194 65 12)" : "rgb(251 146 60)")}
                        className={"[&>svg>text]:!font-bold"}

                        readOnly size={45} />
            }

        </div>
    ));

    const handleViewReport = async () => {
        if (props.review?.reportId) {
            const response = await getReport(props.review?.reportId);
            if (response && response.data) {
                if (response.data.reportReasons) {
                    response.data.reportReasons = response.data.reportReasons.map(
                        (reason: { id: string, name: string }) => { return reason.name })
                }

                toggleInspectReport(response.data)
            }
        }
    }

    return (
        <div className="relative">
            <div className={classNames("flex gap-10")}>
                <div className="flex flex-col items-center gap-2">
                    <UpvoteDownvote reviewId={props.review?.reviewId} initialVotes={props.review?.votes}
                        currentUserVote={props.review?.currentUserVote}
                        disabled={(props.user?.id == loggedInUser?.id) || props.isPreview}
                    ></UpvoteDownvote>
                    {
                        loggedInUser && props.review?.user?.id && props.review.user.id == loggedInUser.id ?
                            <div className="flex flex-col gap-3">
                                <Link href={"/products/reviews/edit/" + props.review?.reviewId}>
                                    <PencilIcon className="w-5 text-yellow-500 cursor-pointer"></PencilIcon>
                                </Link>
                                <TrashIcon className="w-5 text-red-500 cursor-pointer" onClick={handleDeleteReview}></TrashIcon>

                            </div>
                            : <FlagIconForButton className="w-5 text-red-500 cursor-pointer" onClick={handleReport}></FlagIconForButton>
                    }
                </div>
                <div className="grow flex flex-col gap-3">
                    <div className={classNames("relative flex flex-col gap-6", (!props.isPreview && !props.review?.verified) && 'opacity-50')}>
                        <div className="flex gap-4 items-center justify-between">
                            <div className="flex gap-4 items-center">
                                {
                                    props.isPreview ?
                                        <Tooltip label={"After submitting your review, a sentiment score of 0-100 will be given based on your description!"} withArrow>
                                            <CustomKnob></CustomKnob>
                                        </Tooltip>
                                        :
                                        <Tooltip label={"This sentiment score of 0-100 is given based on your description!"} withArrow>
                                            <CustomKnob></CustomKnob>
                                        </Tooltip>
                                }

                                <div className="text-main font-semibold italic text-2xl max-w-[50%]">{props.review?.title || 'Incredible on Paper, Weak on Execution.'}</div>
                                <Rating
                                    value={props.review?.rating ?? 3}
                                    readOnly
                                />
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 border border-main rounded-full">
                                        <Image src={props.user && props.user.userImage ? props.user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                                    </div>
                                    {
                                        props.isPreview ? <div className="text-main text-lg">{props.user && props.user.username}</div>
                                            : <Link href={"/user/" + props.user?.id} className="hover:underline"><div className="text-main text-lg">{props.user && props.user.username}</div></Link>
                                    }
                                    {props.user && props.user.isVerified ?
                                        <Tooltip label="Verified User!" withArrow>
                                            <CheckBadgeIcon className="w-5 text-main"></CheckBadgeIcon>
                                        </Tooltip>
                                        : <Tooltip label="Unverified User!" withArrow>
                                            <div className="cursor-pointer mb-0.5">
                                                <Unverified></Unverified>
                                            </div>

                                        </Tooltip>
                                    }
                                </div>

                                <div className="text-gray-500 text-sm">{
                                    props.review?.date_created ?
                                        !dayjs(props.review?.date_created).isSame(dayjs(props.review?.date_updated), 'second') ?
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    {dayjs(props.review?.date_created).format('D MMMM YYYY')}
                                                </div>
                                                <Badge color="yellow">Edited</Badge>
                                            </div>
                                            : dayjs(props.review?.date_created).format('D MMMM YYYY')
                                        : dayjs(Date.now()).format('D MMMM YYYY')
                                }
                                </div>
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
                                (
                                    props.review?.tempImages ?
                                        props.review?.tempImages?.map((img, i) => {
                                            return <div className="relative w-[10vw] h-[20vh]" key={i}>
                                                <PreviewImage src={URL.createObjectURL(img)} alt={""} preview imageClassName="object-cover h-full w-full" className="h-full w-full"></PreviewImage>
                                            </div>
                                        }) :
                                        props.review?.images?.map((img, i) => {
                                            return <div className="relative w-[10vw] h-[20vh]" key={i}>
                                                <PreviewImage src={img} alt={""} preview imageClassName="object-cover h-full w-full" className="h-full w-full"></PreviewImage>
                                            </div>
                                        })
                                ) :
                                props.review?.images?.map((img, i) => {
                                    return <div className="relative w-[10vw] h-[20vh]" key={i}>
                                        <PreviewImage src={img} alt={""} preview imageClassName="object-cover h-full w-full" className="h-full w-full"></PreviewImage>
                                    </div>
                                })}
                        </div>
                        {
                            (!props.isPreview &&
                                ((props.review?.reportId &&
                                    <div className="absolute bottom-5 right-5"><Tooltip label={"Your review is removed due to violations!"}
                                        onClick={handleViewReport}
                                    >
                                        <FlagIcon className="text-red-500 w-8 cursor-pointer"></FlagIcon></Tooltip></div>)
                                    ||
                                    (!props.review?.verified &&
                                        <div className="absolute bottom-5 right-5 z-100 opacity-100"><Tooltip label={"This review is under verification!"}>
                                            <InformationCircleIcon className="text-orange-500 w-8 cursor-pointer"></InformationCircleIcon></Tooltip></div>
                                    ))
                            )
                        }


                    </div>
                    <Accordion title={"View comments " + "(" + (props.review?.commentCount ?? 0) + ")"}
                        disabled={props.isPreview || !props.review?.verified}
                        onClick={() => { comments && handleGetComments(1) }}
                    >
                        <div className="p-10 flex flex-col gap-5">
                            <div className="flex flex-col">
                                <div className="flex gap-5">
                                    <div className="relative w-10 h-10 border border-main rounded-full">
                                        <Image src={loggedInUser && loggedInUser.userImage ? loggedInUser.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                                    </div>
                                    <InputTextarea
                                        placeholder="Add a comment"
                                        className="w-full bg-transparent !h-full"
                                        autoResize
                                        rows={2}
                                        value={newComment}
                                        onChange={(e) => { setNewComment(e.target.value) }} />
                                </div>
                                <Button className="mt-3 w-[8vw] self-end bg-main" variant='filled'
                                    onClick={submitComment}
                                >Comment</Button>
                            </div>
                            {
                                comments ?
                                    comments.map((comment: Comment) => {
                                        return (
                                            <CommentBlock comment={comment} key={comment.commentId} originalReview={props.review}></CommentBlock>)
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
        </div>
    )
}

export default ReviewBlock