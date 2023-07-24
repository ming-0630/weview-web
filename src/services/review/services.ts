import CustomToastError from "@/utils/CustomToastError";
import { base64StringToBlob } from "blob-util";
import { client } from "../axiosClient";
import { Comment } from './../../interfaces/commentInterface';

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

export function editReview(props: FormData) {
    const response = client.post(
        "/review/edit",
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

export function fetchReviews(userId: string, pageNum: number, sortBy?: string, direction?: string) {

    const response = client.get(
        "/review/getReviews",
        {
            params: {
                userId: userId,
                pageNum: pageNum,
                sortBy: sortBy,
                direction: direction
            }
        }
    ).then((res) => {
        if (res.data && res.data.reviewList) {
            res.data.reviewList.forEach((review: any) => {
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

    return response
}

export function fetchOneReview(reviewId: string) {
    const response = client.get(
        "/review/getOneReview",
        {
            params: {
                reviewId: reviewId
            }
        }
    ).catch((err) => {
        if (err.response && err.response.data) {
            CustomToastError(err.response.data.message)
        } else {
            CustomToastError(err)
        }

    });

    return response
}

export function deleteReviewAPI(reviewId: string) {
    const response = client.post(
        "/review/delete",
        [],
        {
            params: {
                reviewId: reviewId
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

    return response
}

export function fetchUserComments(
    userId: string,
    pageNum: number,
    sortBy?: string,
    direction?: string) {

    const response = client.get(
        "/review/getUserComments",
        {
            params: {
                userId: userId,
                pageNum: pageNum,
                sortBy: sortBy,
                direction: direction
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

export function deleteCommentAPI(commentId: string) {
    const response = client.post(
        "/review/deleteComment",
        [],
        {
            params: {
                commentId: commentId
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

    return response
}

export function addReport(data: FormData) {
    const response = client.post(
        "review/report/add",
        data
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

export function getReport(reportId: string) {
    const response = client.get(
        "review/report/get",
        {
            params: {
                reportId: reportId
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
