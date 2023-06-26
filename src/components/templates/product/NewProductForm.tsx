import { useState } from "react";
import Category from "@/enums/categoryEnum";
import dayjs from "dayjs";
import { addProduct } from "@/services/product/services";
import { YearPicker } from "@mantine/dates";
import { test } from "node:test";
import { Button } from "@mantine/core";
import { testApi } from "@/services/review/services";

export interface CreateProduct {
    name: string,
    category: Category,
    releaseYear: number,
    description: string,
}

const NewProductForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<CreateProduct>({
        name: "",
        category: 0,
        releaseYear: dayjs().year(),
        description: ""
    });

    const test = async () => {
        const response = await testApi();
        console.log(response)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData();
        if (files) {
            files.forEach(file => {
                data.append('uploadedImages', file)
            });
        }

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", Category[formData.category]);
        data.append("releaseYear", formData.releaseYear.toString());

        const response = await addProduct(data);

        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    const handleUpload = (fileList?: FileList) => {
        if (fileList) {
            const chosenFiles = Array.prototype.slice.call(fileList);

            const uploaded = [...files];
            chosenFiles.some((file) => {
                uploaded.push(file);
            })

            setFiles(uploaded);
        }
    }

    return (
        <div className="min-h-[calc(100vh_-_5rem)] p-10 bg-white">
            <Button className="bg-main" onClick={test}>TEST</Button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="mb-1">Name</label>
                    <input type="text" placeholder="Name" className="input input-md input-primary input-bordered border-3 bg-white w-full"
                        value={formData?.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} />
                </div>

                <div data-theme='cupcake'>
                    <label className="mb-1">Category</label>
                    <select
                        title="Sort by: "
                        className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                        value={formData?.category}
                        onChange={e => {
                            setFormData({ ...formData, category: +e.target.value })
                        }}>
                        <option className='hover:bg-main'>None</option>
                        <option value={Category.SMARTPHONES}>SMARTPHONES</option>
                        <option value={Category.MUSIC}>MUSIC</option>
                        <option value={Category.COMPUTERS}>COMPUTERS</option>
                        <option value={Category.HOMEAPPLIANCES}>HOME APPLIANCES</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1">Release Year</label>
                    <YearPicker value={dayjs().year(formData.releaseYear).toDate()} onChange={e => {
                        setFormData({ ...formData, releaseYear: dayjs(e).year() })
                    }} />
                </div>

                <div>
                    <label className="mb-1">Description</label>
                    <textarea placeholder="Email" className="textarea textarea-primary textarea-bordered border-3 bg-white w-full"
                        value={formData?.description}
                        onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} />
                </div>

                <div>
                    <label className="mb-1">Images</label>
                    <input type="file" multiple className="file-input file-input-ghost w-full max-w-xs"
                        onChange={(e) => { e.target.files && handleUpload(e.target.files) }} />
                </div>
                <button className="btn" type="submit">Submit</button>
            </form >


        </div >
    );
}

export default NewProductForm;
