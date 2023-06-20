import VoteType from "@/enums/voteTypeEnum"
import User from "./userInterface"

export interface Review {
    reviewId?: string
    rating?: number,
    price?: number,
    title?: string
    description?: string
    date_created?: any
    date_updated?: any
    votes?: number,
    currentUserVote?: VoteType | null,
    commentCount?: number,
    user?: User
    images?: string[]
    tempImages?: File[]
}

export default Review