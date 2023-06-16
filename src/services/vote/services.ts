import VoteType from "@/enums/voteTypeEnum";
import CustomToastError from "@/utils/CustomToastError";
import { client } from "../axiosClient";

export function voteReview(userId: string, vote: VoteType, reviewId: string, commentId: string) {
    const response = client.post(
        "/voting/vote",
        null,
        {
            params: {
                userId: userId,
                reviewId: reviewId,
                commentId: commentId,
                voteType: vote
            }

        }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }
    });

    return response
}

export function getVotes(reviewId: string, commentId: string) {
    const response = client.get(
        "/voting/getVotes",
        {
            params: {
                reviewId: reviewId,
                commentId: commentId
            }

        }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }
    });

    return response
}