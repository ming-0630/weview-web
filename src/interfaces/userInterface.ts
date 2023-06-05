import { StaticImageData } from "next/image";

interface User {
    id: string;
    email: string;
    username: string;
    roles: { id: number, name: string }[];
    userImage: string;
}

export default User