import { client } from "../axiosClient";
import { base64StringToBlob } from "blob-util";
import CustomToastError from "@/utils/CustomToastError";

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
        if (err.response && err.response.data) {
            console.log(err.response.data.message);
            CustomToastError(err.response.data.message);
        } else if (err && err.response) {
            CustomToastError(err.response)
        } else {
            CustomToastError(err)
        }
    });

    return response
}

export function getProductPreview() {
    const response = client.get(
        "/product/getPreview",
    ).then((res) => {
        if (res.data) {
            res.data.forEach((product: any) => {
                const blob = base64StringToBlob(product.coverImage);
                const img = URL.createObjectURL(blob);
                product.coverImage = img;
            });
        }
        return res;
    }).catch((err) => {
        CustomToastError(err)
    });

    return response
}