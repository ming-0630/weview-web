import CustomToastError from "@/utils/CustomToastError";
import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";

export function fetchRewards(pageNum: number, sortBy?: string, direction?: string) {
    const response = client.get(
        "/user/reward/getRewards",
        {
            params: {
                pageNum: pageNum,
                sortBy: sortBy,
                direction: direction
            }
        },
    ).then((res) => {
        if (res.data && res.data.rewards) {
            res.data.rewards.forEach((reward: any) => {
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

export function fetchReports() {
    const response = client.get(
        "/review/report/getAll",
    ).then((res) => {
        if (res.data) {
            res.data.forEach((reportList: any) => {
                reportList.reports.forEach((report: any) => {
                    report.reportReasons = report.reportReasons.map((x: any) => x.name)
                })
                if (reportList.review.user.userImage) {
                    const blob = base64StringToBlob(reportList.review.user.userImage);
                    const img = URL.createObjectURL(blob);
                    reportList.review.user.userImage = img;
                }
                reportList.review.images.forEach((reviewImage: any, index: number) => {
                    const blob = base64StringToBlob(reviewImage);
                    const img = URL.createObjectURL(blob);
                    reportList.review.images[index] = img;
                })
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

export function reportAction(data: FormData) {
    const response = client.post(
        "/review/report/action",
        data
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

export function fetchAllProducts() {
    const response = client.get(
        "/product/getAllUnpaged",
    ).then((res) => {
        if (res.data && res.data.rewards) {
            res.data.rewards.forEach((reward: any) => {
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

export function fetchProductToEdit(productId: string) {
    const response = client.get(
        "/product/getProductToEdit", {
        params: {
            productId: productId
        }
    }
    ).then((res) => {
        if (res.data && res.data.images) {
            res.data.images.forEach((image: any, i: number) => {
                const blob = base64StringToBlob(image);
                res.data.images[i] = blob;
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

export function addProduct(props: FormData) {

    console.table([...props]);
    const response = client.post(
        "/product/add",
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

export function editProduct(props: FormData) {
    const response = client.post(
        "/product/edit",
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
