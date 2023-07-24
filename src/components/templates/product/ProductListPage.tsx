import ProductCard from "@/components/layout/productCard/ProductCardV1";
import Category from "@/enums/categoryEnum";
import Product from "@/interfaces/productInterface";
import { getAllProductPreview, getCategoryPreview, getSearchProduct } from "@/services/product/services";
import { addToWatchlist } from "@/services/user/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import useStore from "@/utils/useStore";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    // const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);

    const [products, setProducts] = useState<Product[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const user = useStore(useAuthStore, (state) => state.loggedInUser)
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)

    const getProduct = async (page: number, sortCategory: SortProps) => {

        try {
            loadingHandler.open();
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
            loadingHandler.close();
        }
    }

    const handleOnWatchlistClick = async (productId: string) => {
        loadingHandler.open();
        if (user) {
            const response = await addToWatchlist(productId, user?.id)
            if (response && response.status == 200 && response.data) {
                toast.success(response.data);
                getProduct(page, sortCategory);
            }
        } else {
            CustomToastError("Please login to add to watchlist");
            loadingHandler.close();
            toggleLogin();
            return;
        }
        loadingHandler.close();
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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page, user])

    // On Sort Change
    useEffect(() => {
        setPage(1);
        getProduct(1, sortCategory);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [sortCategory])

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    return (
        <div className="min-h-[calc(100vh_-_5rem)] p-10 bg-white">
            <div className="flex flex-col w-[70vw] xl:w-[60vw] m-auto">
                <div className="flex justify-end items-center mb-5">
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
                                <option value={JSON.stringify({ by: "rating", direction: "desc" })}>Highest Rating</option>
                                <option value={JSON.stringify({ by: "rating", direction: "asc" })}>Lowest Rating</option>
                            </select>
                        </div>
                        {/* <div className="dropdown dropdown-end">
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
                        </div> */}
                    </div>
                </div>

                <div className="grid gap-10 min-h-[50vh]
                grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]
                2xl:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
                3xl:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
                    {products.length <= 0 && <p className="m-auto text-3xl">No products found</p>}
                    {products.map(product => {
                        return (
                            <div className="my-5 w-[15rem] 2xl:w-[18rem] 3xl:w-[20rem] h-[20rem] 2xl:h-[23rem]" key={product.productId}>
                                <ProductCard product={product}
                                    onWatchlistClick={() => { handleOnWatchlistClick(product.productId!) }}
                                ></ProductCard>
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
