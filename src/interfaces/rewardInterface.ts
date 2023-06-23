import VoteType from "@/enums/voteTypeEnum";
import User from "./userInterface";

export interface Reward {
    id?: string,
    name?: string,
    codeCount?: number,
    points?: number
    image?: string
}

export default Comment