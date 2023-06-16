import { ArrowDownCircleIcon, ArrowUpCircleIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import blankUserImage from '../../../assets/blank_user.png'
import User from "@/interfaces/userInterface";
import Accordion from "@/components/ui/Accordion";
import FadedLine from "@/components/ui/FadedLine";
import { useEffect, useState } from "react";
import Comment from "@/interfaces/commentInterface";
import dayjs from "dayjs";
import UpvoteDownvote from "@/components/ui/UpvoteDownvote";

export interface CommentBlockProps {
    className?: string;
    comment?: Comment;
}

const CommentBlock = (props: CommentBlockProps) => {
    const [comment, setComment] = useState<Comment>();

    useEffect(() => {
        setComment(props.comment)
    }, [props.comment])

    return (
        <div className="flex flex-col p-8">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 border border-main rounded-full">
                        <Image src={comment?.user && comment.user.userImage ? comment.user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                    </div>
                    <div className="text-main text-lg">{comment?.user.username && comment.user.username}</div>
                </div>


                <div className="flex items-center gap-2">
                    <UpvoteDownvote commentId={props.comment?.commentId} intialVotes={props.comment?.votes}
                        currentUserVote={props.comment?.currentUserVote} isHorizontal
                    ></UpvoteDownvote>
                    <FlagIcon className="w-5 text-red-500"></FlagIcon>
                </div>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap' }} className="text-justify font-sans text-sm p-3">
                {props.comment?.text}
            </pre>
            <div className="text-gray-500 text-sm self-end">{dayjs(comment?.dateCreated).toString()}</div>
        </div>
    )
}

export default CommentBlock