import FileUpload from "@/components/ui/FileUpload";
import Modal from "@/components/ui/Modal";
import Category from "@/enums/categoryEnum";
import Product from "@/interfaces/productInterface";
import { editProduct, fetchProductToEdit } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, Input, Textarea } from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import dayjs from "dayjs";
import { toInteger } from "lodash";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WeViewLogo from '/public/favicon.ico';

const EditProductModal = () => {
    const isShow = useGlobalStore((state) => state.editProductIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleEditProductIsOpen)
    const { editingProductId, refreshFunction, loadingHandler } = useGlobalStore();
    const [product, setProduct] = useState<Product>()

    const [images, setImages] = useState<File[]>([]);
    const [decade, setDecade] = useState(new Date());

    const getProduct = async () => {
        if (editingProductId) {
            try {
                loadingHandler.open();
                const response = await fetchProductToEdit(editingProductId);

                if (response && response.data) {
                    if (response.data) {
                        setProduct(response.data)
                        setImages(response.data.images.map((image: Blob, i: number) => {
                            let file = new File([image], "Image" + i + ".jpg", { type: 'image/jpeg' });
                            return (file)
                        }))
                        setDecade(new Date(response.data.releaseYear))
                    }
                }
            } finally {
                loadingHandler.close();
            }
        }
    }

    useEffect(() => {
        console.log(images)
    }, [images])


    useEffect(() => {
        getProduct()
    }, [editingProductId])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!product) {
            CustomToastError("Missing product!")
            return
        }

        try {
            loadingHandler.open();
            const data = new FormData();
            if (images) {
                images.forEach(image => {
                    data.append('uploadedImages', image)
                });
            }

            if (!product.name || !product.description || !product.category || !product.releaseYear || images.length <= 0) {
                CustomToastError("Empty Fields!")
                return;
            }

            data.append("productId", product.productId!)
            data.append("name", product.name);
            data.append("description", product.description);
            data.append("category", product.category.toString());
            data.append("releaseYear", product.releaseYear.toString());

            const response = await editProduct(data);

            if (response && response.status == 200) {
                if (refreshFunction) {
                    refreshFunction();
                }
                toast.success("Edited product!");
                resetFields();
                toggleModal();
            }

            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        } finally {
            loadingHandler.close();
        }
    }

    const resetFields = () => {
        setImages([]);
        setProduct({})
    }

    return (
        <Modal isShow={isShow}
            toggleModal={() => { resetFields(); toggleModal() }}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Edit Product"}</div>
                </div>
                <div className="p-3">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex items-center">
                            <div className="grow">
                                <Input placeholder="Name" value={product?.name} classNames={{ input: 'p-5' }}
                                    onChange={(e) => { setProduct({ ...product, name: e.target.value }) }}></Input>
                            </div>

                            <div data-theme='cupcake' className="ml-10">
                                <select
                                    title="Sort by: "
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={product?.category && Category[product?.category]}
                                    onChange={e => {
                                        setProduct({ ...product, category: +e.target.value })
                                    }}>
                                    <option value={Category.SMARTPHONES}>SMARTPHONES</option>
                                    <option value={Category.MUSIC}>MUSIC</option>
                                    <option value={Category.COMPUTERS}>COMPUTERS</option>
                                    <option value={Category.HOMEAPPLIANCES}>HOME APPLIANCES</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Textarea placeholder="Product Description"
                                className="grow mr-5"
                                classNames={{ input: 'h-40' }}
                                value={product?.description}
                                onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}
                            ></Textarea>
                            <div>
                                <YearPicker
                                    date={decade}
                                    onDateChange={setDecade}
                                    value={product?.releaseYear ? dayjs().year(toInteger(product.releaseYear)).toDate() : dayjs().year(2023).toDate()}
                                    onChange={(e) => { setProduct({ ...product, releaseYear: dayjs(e).year().toString() }) }}
                                    size="xs"
                                />
                            </div>
                        </div>

                        <div>
                            <FileUpload
                                files={images}
                                setFiles={setImages}
                                containerClassName="max-h-[45vh]"
                            ></FileUpload>
                        </div>
                        <Button className="bg-main mb-3 self-end" onClick={handleSubmit}>Submit</Button>
                    </form >
                </div>
            </div>
        </Modal >
    )
}

export default EditProductModal 
