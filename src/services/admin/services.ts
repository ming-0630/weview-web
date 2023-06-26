import CustomToastError from "@/utils/CustomToastError";
import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";

export function fetchRewards(pageNum: number) {
    const response = client.get(
        "/user/reward/getRewards",
        {
            params: {
                pageNum: pageNum,
                // sortBy: sortBy,
                // direction: direction
            }
        },
    ).then((res) => {
        if (res.data && res.data.rewards) {
            res.data.rewards.forEach((reward: any) => {
                console.log(reward)
                const blob = base64StringToBlob(reward.image);
                const img = URL.createObjectURL(blob);
                reward.image = img;
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
    return response
}

export function addReward(props: FormData) {
    const response = client.post(
        "/user/reward/add",
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

export function editReward(props: FormData) {
    const response = client.post(
        "/user/reward/edit",
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

export function getCodes(rewardId: string) {
    const response = client.get(
        "/user/reward/getCodes",
        {
            params: {
                rewardId: rewardId
            }
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

export function addCodes(rewardId: string, codes: string[]) {
    const response = client.post(
        "/user/reward/addCodes",
        { rewardId, codes }
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