import Modal from "@/components/ui/Modal";
import Category from "@/enums/categoryEnum";
import { useGlobalStore } from "@/states/globalStates";
import { Button, Input, NumberInput, Switch, Textarea } from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import dayjs from "dayjs";
import Image from 'next/image';
import { useEffect, useState } from "react";
import WeViewLogo from '/public/favicon.ico';
import FileUpload from "@/components/ui/FileUpload";
import { toast } from "react-toastify";
import CustomToastError from "@/utils/CustomToastError";
import { addProduct } from "@/services/admin/services";
import { toInteger } from "lodash";
import { checkFeaturedLimit } from "@/services/product/services";

export interface CreateProduct {
    name: string,
    category: Category,
    releaseYear: number,
    description: string,
    minProductPriceRange?: string,
    maxProductPriceRange?: string,
    isFeatured: boolean;
}

const NewProductModal = () => {
    const isShow = useGlobalStore((state) => state.newProductIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleNewProductIsOpen)
    const { refreshFunction, loadingHandler } = useGlobalStore();
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)

    const [images, setImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<CreateProduct>({
        name: "",
        category: 0,
        releaseYear: dayjs().year(),
        description: "",
        minProductPriceRange: undefined,
        maxProductPriceRange: undefined,
        isFeatured: false
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            loadingHandler.open();
            const data = new FormData();
            if (images) {
                images.forEach(image => {
                    data.append('uploadedImages', image)
                });
            }

            if (!formData.name || !formData.description || formData.category == 0 || images.length <= 0
                || !formData.minProductPriceRange || !formData.maxProductPriceRange) {
                CustomToastError("Empty Fields!")
                return;
            }

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", Category[formData.category]);
            data.append("releaseYear", formData.releaseYear.toString());
            data.append("minProductPriceRange", formData.minProductPriceRange.toString());
            data.append("maxProductPriceRange", formData.maxProductPriceRange.toString());
            data.append("isFeatured", formData.isFeatured.toString())

            if (formData.isFeatured) {
                const response = await checkFeaturedLimit();
                if (response && response.data) {
                    if (response.data.hasExceededFeaturedLimit) {
                        loadingHandler.close();
                        toggleModal();
                        toggleConfirm({
                            title: "Exceeded Limit!",
                            description: "There are already 10 featured products! Are you sure you want to replace the oldest featured product?",
                            onClickYes: () => { loadingHandler.open(); toggleModal(); addProduct(data); toggleConfirm(); },
                            onClickNo: () => toggleModal()
                        });
                    } else {
                        addNewProduct(data)
                    }
                }
            } else {
                addNewProduct(data)
            }

            // for (var pair of data.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }
        } finally {
            loadingHandler.close();
        }
    }

    const addNewProduct = async (data: FormData) => {
        const response = await addProduct(data);

        if (response && response.status == 200) {
            if (refreshFunction) {
                refreshFunction();
            }
            toast.success("Added product!");
            resetFields();
        }
    }

    const resetFields = () => {
        setImages([]);
        setFormData({
            name: "",
            category: 0,
            releaseYear: dayjs().year(),
            description: "",
            minProductPriceRange: undefined,
            maxProductPriceRange: undefined,
            isFeatured: false
        })
    }

    return (
        <Modal isShow={isShow}
            toggleModal={() => { resetFields(); toggleModal() }}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"New Product Creation"}</div>
                </div>
                <div className="p-3">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex items-center">
                            <div className="basis-1/2">
                                <Input placeholder="Name" value={formData?.name} classNames={{ input: 'p-5' }}
                                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}></Input>
                            </div>

                            <div data-theme='cupcake' className="ml-10 basis-1/2 flex justify-center">
                                <select
                                    title="Sort by: "
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={formData?.category}
                                    onChange={e => {
                                        setFormData({ ...formData, category: +e.target.value })
                                    }}>
                                    <option value={Category.NONE} className='hover:bg-main'>None</option>
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
                                value={formData?.description}
                                onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                            ></Textarea>
                            <div className="basis-1/2 flex justify-center">
                                <YearPicker value={dayjs().year(formData.releaseYear).toDate()} onChange={e => {
                                    setFormData({ ...formData, releaseYear: dayjs(e).year() })
                                }}
                                    size="xs"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="grow">
                                <Input placeholder="Min Price"
                                    value={formData.minProductPriceRange ? formData.minProductPriceRange : ""}
                                    classNames={{ input: 'p-5' }}
                                    type="number"
                                    step="1"
                                    onChange={(e) => { setFormData({ ...formData, minProductPriceRange: e.target.value }) }}></Input>
                            </div>
                            <div className="grow">
                                <Input placeholder="Max Price"
                                    value={formData.maxProductPriceRange ? formData.maxProductPriceRange : ""}
                                    classNames={{ input: 'p-5' }}
                                    type="number"
                                    step="1"
                                    onChange={(e) => { setFormData({ ...formData, maxProductPriceRange: e.target.value }) }}></Input>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Switch checked={formData.isFeatured} onChange={(event) => setFormData({ ...formData, isFeatured: event.currentTarget.checked })}
                                label={"Featured Product?"}
                            />
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

export default NewProductModal 
