import UpvoteDownvote from "@/components/ui/UpvoteDownvote";
import Comment from "@/interfaces/commentInterface";
import { deleteCommentAPI } from "@/services/review/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import { FlagIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import blankUserImage from '../../../assets/blank_user.png';

export interface CommentBlockProps {
    className?: string;
    comment?: Comment;
    refreshFunction?: (...args: any[]) => void
}

const CommentBlock = (props: CommentBlockProps) => {

    const { loggedInUser } = useAuthStore();
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const handleDeleteComment = () => {
        toggleConfirm({
            title: "Confirm Delete?",
            description: "Are you sure you want to delete this review?",
            onClickYes: () => { deleteCommment(); toggleConfirm(); }
        });
    }

    const deleteCommment = async () => {
        try {
            loadingHandler.open();
            if (props.comment) {
                const response = await deleteCommentAPI(props.comment.commentId!)

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
        console.log(props.comment)
        console.log(loggedInUser)
    }

    return (
        <div className="flex flex-col p-8">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 border border-main rounded-full">
                        <Image src={props.comment?.user && props.comment.user.userImage ? props.comment.user.userImage : blankUserImage}
                            alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                    </div>
                    <div className="text-main text-lg">{props.comment?.user && props.comment.user.username}</div>
                </div>

                <div className="flex items-center gap-2">
                    <UpvoteDownvote commentId={props.comment?.commentId} intialVotes={props.comment?.votes}
                        currentUserVote={props.comment?.currentUserVote} isHorizontal
                        disabled={props.comment?.user?.id == loggedInUser?.id}
                    ></UpvoteDownvote>
                    {
                        props.comment?.user?.id == loggedInUser?.id ?
                            <TrashIcon className="w-5 text-red-500 cursor-pointer" onClick={handleDeleteComment}></TrashIcon>
                            : <FlagIcon className="w-5 text-red-500 cursor-pointer" onClick={handleReport}></FlagIcon>
                    }
                </div>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap' }} className="text-justify font-sans text-sm p-3">
                {props.comment?.text}
            </pre>
            <div className="text-gray-500 text-sm self-end">{dayjs(props.comment?.dateCreated).toString()}</div>
        </div>
    )
}

export default CommentBlock