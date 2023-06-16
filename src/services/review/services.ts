import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";
import CustomToastError from "@/utils/CustomToastError";
import Comment from "@/interfaces/commentInterface";

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



export function getComments(reviewId: string, pageNum: number) {

    const response = client.get(
        "/review/getComments",
        {
            params: {
                reviewId: reviewId,
                pageNum: pageNum
            }
        }
    ).then((res) => {
        if (res.data && res.data.commentList) {
            res.data.commentList.forEach((c: Comment) => {
                if (c.user && c.user.userImage) {
                    const blob = base64StringToBlob(c.user.userImage);
                    const img = URL.createObjectURL(blob);
                    c.user.userImage = img;
                }
            })
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

export function addComment(
    comment: string,
    reviewId: string,
    userId: string,
) {

    const response = client.post(
        "/review/addComment",
        {},
        {
            params: {
                comment: comment,
                reviewId: reviewId,
                userId: userId
            }
        }
    ).then((res) => {
        if (res.data && res.data.commentList) {
            res.data.commentList.forEach((c: Comment) => {
                if (c.user && c.user.userImage) {
                    const blob = base64StringToBlob(c.user.userImage);
                    const img = URL.createObjectURL(blob);
                    c.user.userImage = img;
                }
            })
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