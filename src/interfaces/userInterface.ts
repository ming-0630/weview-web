import { StaticImageData } from "next/image";

interface User {
    id: string;
    username: string;
    userImage?: string;
    userImageBase64?: string;
    isVerified: boolean;
    points: number;
    role: string[]
}

export default User