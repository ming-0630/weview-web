import { base64StringToBlob } from "blob-util";
import { client } from "../axiosClient";
import CustomToastError from "@/utils/CustomToastError";

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
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });
    return response;
}

export function addToWatchlist(productId: string, userId: string) {
    const response = client.post(
        "user/addToWatchlist",
        null, {
        params: {
            productId: productId,
            userId: userId
        }
    }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });
    return response;
}


export function fetchWatchlist(userId: string, pageNum: number, sortBy?: string, direction?: string) {
    const response = client.get(
        "user/watchlist",
        {
            params: {
                userId: userId,
                pageNum: pageNum,
                sortBy: sortBy,
                direction: direction
            }
        }
    ).then((res) => {
        if (res.data && res.data.productDTOs) {
            res.data.productDTOs.forEach((product: any) => {
                const blob = base64StringToBlob(product.coverImage);
                const img = URL.createObjectURL(blob);
                product.coverImage = img;
            });
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

export function updateProfilePicture(props: FormData) {
    const response = client.post(
        "/user/updateProfilePicture",
        props,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        },
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });

    return response
}

export function getUser() {
    const response = client.get(
        "user/getUser"
    ).then((res) => {
        if (res.data && res.data.userImage) {
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
    return response;
}

export function getVerificationCode(phone: string) {
    const response = client.get(
        "user/generateOTP",
        {
            params: {
                phoneNumber: phone
            }
        }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });
    return response;
}

export function verifyCode(phone: string, code: string) {
    const response = client.get(
        "user/verifyOTP",
        {
            params: {
                phoneNumber: phone,
                code: code
            }
        }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });
    return response;
}

export function redeemReward(rewardId: string) {
    const response = client.post(
        "user/reward/redeem",
        null,
        {
            params: {
                rewardId: rewardId
            }
        }
    ).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });
    return response;
}

export function getUserProfile(userId: string) {
    const response = client.get(
        "user/getUserProfile", {
        params: {
            userId: userId
        }
    }
    ).then((res) => {
        if (res.data) {
            if (res.data.userImage) {
                const blob = base64StringToBlob(res.data.userImage);
                const img = URL.createObjectURL(blob);
                res.data.userImage = img;
            }

            res.data.reviews.forEach((review: any) => {
                if (review.user.userImage) {
                    const blob = base64StringToBlob(review.user.userImage);
                    const img = URL.createObjectURL(blob);
                    review.user.userImage = img;
                }

                if (review.images) {
                    review.images.forEach((img: any, j: number) => {
                        const blob = base64StringToBlob(img);
                        const obj = URL.createObjectURL(blob);
                        review.images[j] = obj;
                    })
                }
            });
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

