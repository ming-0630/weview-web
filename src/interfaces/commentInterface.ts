import VoteType from "@/enums/voteTypeEnum";
import User from "./userInterface";

export interface Comment {
    commentId: string,
    text: string,
    user: User,
    dateCreated: Date,
    votes: number,
    currentUserVote: VoteType | null,
}

export default Comment