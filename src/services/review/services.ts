import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";
import CustomToastError from "@/utils/CustomToastError";

export function addReview(props: FormData) {

    const response = client.post(
        "/review/add",
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

export function checkEligibility(productId: string, userId: string) {

    const response = client.get(
        "/review/checkUserEligibility",
        {
            params: {
                userId: userId,
                productId: productId
            }
        }
        ,
    ).then((res) => {
        if (res && res.status == 200 && res.data) {
            if (res.data.isEligible) {
                return true;
            } else {
                CustomToastError(res.data.message)
                return false;
            }
        }

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

export function fetchReviewData(productId: string, type: string) {
    let url;

    switch (type) {
        case '1M': {
            url = '/review/getRating1M'
            break;
        }
        case '1Y': {
            url = '/review/getRating1Y'
            break;
        }
        case 'MAX': {
            url = '/review/getRatingMAX'
            break;
        }
    }

    const response = url && client.get(
        url,
        {
            params: {
                productId: productId
            }
        }
        ,
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