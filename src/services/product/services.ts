import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";
import CustomToastError from "@/utils/CustomToastError";
import Category from "@/enums/categoryEnum";

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

export function getAllProductPreview(pageNum: number, sortBy?: string, direction?: string) {
    const response = client.get(
        "/product/getAllPreview",
        {
            params: {
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
    return response
}

export function getCategoryPreview(category: Category, pageNum: number,
    sortBy?: string, direction?: string) {
    const response = client.get(
        "/product/getCategoryPreview", {
        params: {
            category: Category[category],
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
    return response
}

export function getSearchProduct(keyword: string, category: Category, pageNum: number,
    sortBy?: string, direction?: string) {
    const response = client.get(
        "/product/search",
        {
            params: {
                keyword: keyword,
                category: Category[category],
                pageNum: pageNum,
                sortBy: sortBy,
                direction: direction
            }
        },
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
    return response
}

export function getProductDetails(id: string, pageNum: number,
    sortBy?: string, direction?: string) {
    const response = client.get(
        "/product/details",
        {
            params: {
                id: id,
                reviewPageNum: pageNum,
                reviewSortBy: sortBy,
                reviewDirection: direction
            }
        },
    ).then((res) => {
        if (res.data && res.data.images) {
            res.data.images.forEach((img: any, i: number) => {
                const blob = base64StringToBlob(img);
                const obj = URL.createObjectURL(blob);
                res.data.images[i] = obj;
            })

            if (res.data.reviews) {
                res.data.reviews.forEach((review: any) => {
                    if (review.user.userImage) {
                        const blob = base64StringToBlob(review.user.userImage);
                        const obj = URL.createObjectURL(blob);
                        review.user.userImage = obj
                    }

                    if (review.images) {
                        review.images.forEach((img: any, j: number) => {
                            const blob = base64StringToBlob(img);
                            const obj = URL.createObjectURL(blob);
                            review.images[j] = obj;
                        })
                    }
                })
            }
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