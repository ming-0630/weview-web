import { toast } from "react-toastify";
import { client } from "../axiosClient";

export interface RegisterDto {
    email: string,
    password: string
}

export interface LoginDto {
    email?: string,
    password?: string
}

export function register(props: RegisterDto) {
    let data = JSON.stringify({
        "email": "user1",
        "password": "password"
    })

    return client.post(
        "auth/register",
        { data },
        { authorization: false }
    );
}

export function login(creds: LoginDto) {
    let data = JSON.stringify(creds)

    const response = client.post(
        "auth/login",
        data,
        { authorization: false }
    ).catch((err) => {
        toast.error(err.response.data.message)
    })

    return response;
}

export function getProfile() {
    return client.get("/users/profile");
} 