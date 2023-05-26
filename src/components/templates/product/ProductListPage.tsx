import ProductCard from "@/components/layout/product-card/ProductCardV1";
import Category from "@/enums/category_enum";
import { Key, ReactElement, useEffect, useState } from "react";
import smartphone from '../../../assets/smartphone 1.png';
import smartphone2 from '../../../assets/smartphone 2.png';
import { Pagination, Slider, ThemeProvider, createTheme } from "@mui/material";
import { ArrowLeftCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getProductPreview } from "@/services/product/services";
import Product from "@/interfaces/product_interfaces";

const ProductListPage = () => {
    const [sortCategory, setSortCategory] = useState("");
    const [ratingRange, setRatingRange] = useState<number[]>([0, 5]);

    const [products, setProducts] = useState<Product[]>([]);

    const getProduct = () => {
        const fetchData = async () => {
            const response = await getProductPreview();
            if (response && response.data) {
                setProducts(response.data);
            }
        }
        fetchData().catch(console.error)
    }

    useEffect(() => {
        getProduct();
    }, [])

    const handleRatingChange = (event: Event, newValue: number | number[]) => {
        setRatingRange(newValue as number[]);
        console.log(ratingRange);
    };

    const handleFilter = () => {
        // Api Call
    }

    // const testProduct = (index: number) => {
    //     return {
    //         name: 'iPhone 14 Pro ' + index,
    //         type: Category.SMARTPHONES,
    //         rating: 0
    //     }
    // }


    // for (let index = 0; index < 10; index++) {
    //     trendingProducts.push(<div className="my-5 w-[17rem] 2xl:basis-1/5" key={index}>
    //         <ProductCard product={testProduct(index)} image={smartphone2} hasBorder></ProductCard>
    //     </div>)
    // }


    return (
        <div className="min-h-[calc(100vh_-_5rem)] p-10 bg-white">
            <div className="flex flex-col w-[80vw] m-auto">
                <div className="flex justify-between items-center mb-5">
                    <Link href={""}>
                        <div><ArrowLeftCircleIcon className="text-main w-12"></ArrowLeftCircleIcon></div>
                    </Link>
                    <div className='text-main text-3xl xl:text-5xl font-medium drop-shadow-sm'>Product List</div>
                </div>
                <hr className="border-none h-1 bg-main/50 w-1/4 self-end rounded-full"></hr>

                <div className="flex items-center justify-end my-5">
                    <div className="flex">
                        <div data-theme="cupcake" className="flex items-center mr-5">
                            <label className="mr-3 text-md xl:text-lg">Sort By:</label>
                            <select
                                title="Sort by: "
                                className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                value={sortCategory}
                                onChange={e => setSortCategory(e.target.value)}>
                                <option className='hover:bg-main'>None</option>
                                <option>Highest Rating</option>
                                <option>Lowest Rating</option>
                                <option>A to Z</option>
                                <option>Z to A</option>
                                {/* <option>Highest Average Price</option>
                                <option>Lowest Average Price</option> */}
                            </select>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn m-1 bg-main text-white border-none hover:bg-main hover:brightness-95">Filter</label>
                            <div tabIndex={0} className="dropdown-content rounded-lg menu bg-white text-main p-5 w-[20vw] border-main border-2 mt-2 
                            flex flex-col">
                                <div className="">
                                    <span className="">Range of Ratings</span>
                                    <Slider
                                        getAriaLabel={() => 'Range of Ratings'}
                                        value={ratingRange}
                                        max={5}
                                        onChange={handleRatingChange}
                                        valueLabelDisplay="auto"
                                        step={0.01}
                                    />
                                </div>
                                <div className="self-end">
                                    <div className="btn" onChange={handleFilter}>Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-around gap-5">
                    {products.map(product => {
                        return (
                            <div className="my-5 w-[15rem] xl:w-[19rem] 3xl:basis-1/5 h-[20rem] xl:h-[23rem]" key={product.productId}>
                                <ProductCard product={product} hasBorder></ProductCard>
                            </div>
                        )
                    })

                    }
                </div>
                <div className="self-center mt-10">
                    <Pagination count={10} color="primary" size="large" />
                </div>

            </div>
        </div>
    );
}

export default ProductListPage;
