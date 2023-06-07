import ProductCard from "@/components/layout/productCard/ProductCardV1";
import Category from "@/enums/categoryEnum";
import { useEffect, useState } from "react";
import { getAllProductPreview, getCategoryPreview, getSearchProduct } from "@/services/product/services";
import Product from "@/interfaces/productInterface";
import { LoadingOverlay, Pagination, RangeSlider, Slider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface ProductListPageProps {
    category?: string | string[];
    searchString?: string | string[];
}

export interface SortProps {
    by: string,
    direction: string
}

const ProductListPage = (props: ProductListPageProps) => {
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "name", direction: "asc" });
    const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);

    const [products, setProducts] = useState<Product[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const [isLoading, handlers] = useDisclosure(false);

    const getProduct = async (page: number, sortCategory: SortProps) => {
        handlers.open();
        try {
            let response;

            if (!props.category || (props.category === "all" && !props.searchString)) {
                response = await getAllProductPreview(
                    page,
                    sortCategory.by,
                    sortCategory.direction
                );
            } else if (!props.searchString) {
                response = await getCategoryPreview(
                    Category[props.category.toString().toUpperCase() as keyof typeof Category],
                    page,
                    sortCategory.by,
                    sortCategory.direction);
            } else {
                response = await getSearchProduct(
                    props.searchString.toString(),
                    Category[props.category.toString().toUpperCase() as keyof typeof Category],
                    page,
                    sortCategory.by,
                    sortCategory.direction);
            }

            if (response && response.data && response.data.productDTOs) {
                setProducts(response.data.productDTOs);
                setTotalPage(response.data.totalPages);
            } else {
                setProducts([]);
                setTotalPage(0);
            }
        } catch (e) {
            console.error(e);
        } finally {
            handlers.close();
        }
    }

    // On Props change
    useEffect(() => {
        if (page != 1) {
            setPage(1);
        }

        if (JSON.stringify(sortCategory) !== JSON.stringify({ by: "name", direction: "asc" })) {
            setSortCategory({ by: "name", direction: "asc" })
        }
        getProduct(1, sortCategory);
    }, [props])


    // On page change
    useEffect(() => {
        getProduct(page, sortCategory);
    }, [page])

    // On Sort Change
    useEffect(() => {
        setPage(1);
        getProduct(1, sortCategory);
    }, [sortCategory])

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    const handleRatingChange = (value: [number, number]) => {
        setRatingRange(value);
        console.log(value)
    }

    const handleFilter = () => {
        // Api Call
    }

    return (
        <div className="min-h-[calc(100vh_-_5rem)] p-10 bg-white">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="flex flex-col w-[80vw] m-auto">
                <div className="flex justify-end items-center mb-5">
                    {/* <Link href={""}>
                        <div><ArrowLeftCircleIcon className="text-main w-12"></ArrowLeftCircleIcon></div>
                    </Link> */}
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
                                value={JSON.stringify(sortCategory)}
                                onChange={e => setSortCategory(JSON.parse(e.target.value))}
                            >
                                <option value={JSON.stringify({ by: "name", direction: "asc" })}>A to Z</option>
                                <option value={JSON.stringify({ by: "name", direction: "desc" })}>Z to A</option>
                                <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Highest Rating</option>
                                <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Lowest Rating</option>

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
                                    <RangeSlider
                                        min={0}
                                        max={5}
                                        step={0.01}
                                        minRange={0.5}
                                        precision={2}
                                        value={ratingRange}
                                        onChange={setRatingRange}
                                    ></RangeSlider>
                                </div>
                                <div className="self-end">
                                    <button className="btn disabled:text-black disabled:opacity-70" onChange={handleFilter}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-around gap-5 min-h-[50vh]">
                    {products.length <= 0 && <p className="self-center text-3xl">No products found</p>}
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
                    <Pagination value={page} onChange={handlePageChange} total={totalPage}
                        radius={'xl'}
                        boundaries={5}
                        classNames={{ control: 'border-transparent' }}
                    />
                </div>

            </div>
        </div>
    );
}

export default ProductListPage;
