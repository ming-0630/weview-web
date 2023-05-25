import { CreateProduct } from "@/components/templates/product/NewProductForm";
import Category from "@/enums/category_enum";
import { client } from "../axiosClient";
import { headers } from "next/dist/client/components/headers";
import { toast } from "react-toastify";
import { base64StringToBlob } from "blob-util";
import CustomToastError from "@/utils/CustomToastError";

// export interface ProductDto {
//     product: CreateProduct
//     images: File[]
// }

export function addProduct(props: FormData) {

    // console.table([...props]);
    const response = client.post(
        "/product/add",
        props,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        },
    ).catch((err) => {
        console.log(err);
        if (err.response.data) {
            console.log(err.response.data.message);
            CustomToastError(err.response.data.message);
        } else if (err.response) {
            CustomToastError(err.response)
        } else {
            CustomToastError(err)
        }
    });

    return response
}

export function getProductPreview() {

    // console.table([...props]);
    const response = client.get(
        "/product/getPreview",
    ).then((res) => {
        console.log(res);
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