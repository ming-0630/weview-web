import Review from "./reviewInterface";

interface User {
    id: string;
    username: string;
    userImage?: string;
    userImageBase64?: string;
    isVerified: boolean;
    points: number;
    role: string[];
    reviews?: Review[];
    totalUpvotes?: number;
    totalDownvotes?: number;
}

export default User