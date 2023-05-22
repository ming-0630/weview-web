import { toast } from "react-toastify";
import { client } from "../axiosClient";

export interface RegisterDto {
    email: string,
    username: string,
    password: string
}

export interface LoginDto {
    email?: string,
    password?: string
}

export function register(props: RegisterDto) {
    let data = JSON.stringify(props)

    return client.post(
        "auth/register",
        data,
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
        if (err.response.data) {
            toast.error(err.response.data.message)
        } else if (err.response) {
            toast.error(err.response)
        } else {
            toast.error(err)
        }
    })
    return response;
}

export function getUserImage(id: string) {
    const response = client.get(
        "/getProfilePic", {
        params: {
            id: id
        }, responseType: "blob",
    }).catch(async (err) => {
        console.log(err.response.data);
        const error = await err.response.data.text();
        const msg = JSON.parse(error).message;
        toast.error(msg);
    });

    return response
}

export function getProfile() {
    return client.get("/users/profile");
} 