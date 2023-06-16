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
        if (res.data && res.data.user && res.data.user.userImage) {
            const blob = base64StringToBlob(res.data.user.userImage);
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
    return response;
}