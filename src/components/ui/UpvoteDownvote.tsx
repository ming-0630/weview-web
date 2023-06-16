import VoteType from "@/enums/voteTypeEnum";
import { getVotes, voteReview } from "@/services/vote/services";
import { useAuthStore } from "@/states/authStates";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { ArrowDownCircleIcon as ArrowDownCircleIconOutlined, ArrowUpCircleIcon as ArrowUpCircleIconOutlined } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import CustomToastError from "@/utils/CustomToastError";
import { debounce } from "lodash";

export interface UpvoteDownvoteProps {
    reviewId?: string,
    commentId?: string,
    intialVotes?: number,
    currentUserVote?: VoteType | null,
    isHorizontal?: boolean
}

const UpvoteDownvote = (props: UpvoteDownvoteProps) => {
    const user = useAuthStore((state) => state.loggedInUser)
    const [voteCount, setVoteCount] = useState(0)
    const [currentVote, setCurrentVote] = useState<VoteType | null>(null)

    useEffect(() => {
        if (props.intialVotes) {
            setVoteCount(props.intialVotes)
        }

        if (props.currentUserVote == undefined) {
            setCurrentVote(null);
        } else {
            setCurrentVote(props.currentUserVote)
        }
    }, [props])

    const handleVote = (vote: VoteType) => {
        if (!user) {
            CustomToastError("Please login to continue");
            return;
        }
        if (vote == VoteType.UPVOTE as VoteType) {
            if (currentVote &&
                (VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.UPVOTE as VoteType)
            ) {
                // Turn off the vote
                setCurrentVote(null)
                setVoteCount(voteCount - 1);
            } else if (currentVote &&
                (VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.DOWNVOTE as VoteType)
            ) {
                // Invert the vote (From downvoted to upvoted)
                setCurrentVote(VoteType[VoteType.UPVOTE.toString() as keyof typeof VoteType])

                // +2 because, no more -1, so add 1, then change to upvote, so add 1 again
                setVoteCount(voteCount + 2)
            } else {
                // If no current vote
                setCurrentVote(VoteType[VoteType.UPVOTE.toString() as keyof typeof VoteType])
                setVoteCount(voteCount + 1)
            }
        }

        if (vote == VoteType.DOWNVOTE as VoteType) {
            if (currentVote &&
                (VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.DOWNVOTE as VoteType)
            ) {
                // Turn off the vote
                setCurrentVote(null)
                setVoteCount(voteCount + 1);
            } else if (currentVote &&
                (VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.UPVOTE as VoteType)
            ) {
                // Invert the vote (From upvoted to downvoted)
                setCurrentVote(VoteType[VoteType.DOWNVOTE.toString() as keyof typeof VoteType])

                // -2 because, no more +1, so minus 1, then change to downvote, so minus 1 again
                setVoteCount(voteCount - 2)
            } else {
                // If no current vote
                setCurrentVote(VoteType[VoteType.DOWNVOTE.toString() as keyof typeof VoteType])
                setVoteCount(voteCount - 1)
            }
        }
        sendVote(vote)
    }

    const sendVote = useCallback(
        debounce(
            async (vote: VoteType) => {
                if (user) {
                    if (props.reviewId) {
                        const res = await voteReview(user.id, vote, props.reviewId, "");

                        if (res && res.status == 200) {
                            const votesResponse = await getVotes(props.reviewId, "")

                            if (votesResponse && res.status == 200) {
                                setVoteCount(votesResponse.data);
                            }
                        }
                    }

                    if (props.commentId) {
                        const res = await voteReview(user.id, vote, "", props.commentId);

                        if (res && res.status == 200) {
                            const votesResponse = await getVotes("", props.commentId)

                            if (votesResponse && res.status == 200) {
                                setVoteCount(votesResponse.data);
                            }
                        }
                    }
                }
            }
            , 1500)
        , [props.reviewId, user])

    const iconClass = classNames(
        'w-7 cursor-pointer'
    )

    if (!currentVote) {
        return (
            <div className={classNames("flex items-center", props.isHorizontal ? "flex-row gap-2" : "flex-col")}>
                <ArrowUpCircleIconOutlined className={iconClass} onClick={() => handleVote(VoteType.UPVOTE)}></ArrowUpCircleIconOutlined>
                <div className="font-semibold text-main text-xl">{voteCount}</div>
                <ArrowDownCircleIconOutlined className={iconClass} onClick={() => handleVote(VoteType.DOWNVOTE)}></ArrowDownCircleIconOutlined>
            </div>
        )
    } else {
        return (
            <div className={classNames("flex items-center", props.isHorizontal ? "flex-row gap-2" : "flex-col")}>
                {
                    VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.UPVOTE as VoteType ?
                        <ArrowUpCircleIcon className={iconClass} onClick={() => handleVote(VoteType.UPVOTE)}></ArrowUpCircleIcon> :
                        <ArrowUpCircleIconOutlined className={iconClass} onClick={() => handleVote(VoteType.UPVOTE)}></ArrowUpCircleIconOutlined>
                }

                <div className="font-semibold text-main text-xl">{voteCount}</div>

                {
                    VoteType[currentVote.toString() as keyof typeof VoteType] == VoteType.DOWNVOTE as VoteType ?
                        <ArrowDownCircleIcon className={iconClass} onClick={() => handleVote(VoteType.DOWNVOTE)}></ArrowDownCircleIcon> :
                        <ArrowDownCircleIconOutlined className={iconClass} onClick={() => handleVote(VoteType.DOWNVOTE)}></ArrowDownCircleIconOutlined>
                }

            </div>
        )
    }
}

export default UpvoteDownvote;
