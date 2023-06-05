import { toast } from "react-toastify";
import { client } from "../axiosClient";
import CustomToastError from "@/utils/CustomToastError";
import { base64StringToBlob } from "blob-util";

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
    ).then((res) => {
        if (res.data && res.data.user && res.data.userImage) {
            const blob = base64StringToBlob(res.data.userImage);
            const img = URL.createObjectURL(blob);
            res.data.userImage = img;
        }
        return res;
    }).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });

    // .catch((err) => {
    //     if (err.response && err.response.data) {
    //         console.log(err.response.data.message);
    //         CustomToastError(err.response.data.message);
    //     } else if (err && err.response) {
    //         CustomToastError(err.response)
    //     } else {
    //         CustomToastError(err)
    //     }
    // })
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
        CustomToastError(msg);
    });

    return response
}

export function getProfile() {
    return client.get("/users/profile");
} 