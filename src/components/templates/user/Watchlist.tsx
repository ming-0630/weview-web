import WatchlistCard from "@/components/layout/productCard/WatchlistCard";
import Product from "@/interfaces/productInterface";
import { addToWatchlist, fetchWatchlist } from "@/services/user/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import useStore from "@/utils/useStore";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SortProps } from "../product/ProductListPage";
import { useRouter } from "next/router";
import CustomToastError from "@/utils/CustomToastError";

const Watchlist = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const { loggedInUser } = useAuthStore()

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const router = useRouter();

    const getWatchlist = async (page: number, sortCategory: SortProps) => {
        if (loggedInUser) {
            loadingHandler.open();
            try {
                const response = await fetchWatchlist(
                    loggedInUser?.id,
                    page,
                    sortCategory.by,
                    sortCategory.direction
                );

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
    }

    const handleOnWatchlistDelete = async (productId: string) => {
        if (loggedInUser) {
            const response = await addToWatchlist(productId, loggedInUser?.id)

            if (response && response.status == 200) {
                toast.success("Deleted from watchlist!")
                getWatchlist(page, sortCategory);
            }
        }
    }

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    useEffect(() => {
        if (loggedInUser) {
            setPage(1);
            getWatchlist(1, sortCategory);
        } else {
            router.push("/").then(() => { CustomToastError("You need to be logged in to access watchlist!") })
        }

    }, [sortCategory, loggedInUser])

    // On page change
    useEffect(() => {
        getWatchlist(page, sortCategory);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="md:w-2/3 m-auto px-16 pt-12 flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-main font-bold text-5xl flex">
                        <HeartIcon className="w-12 mr-3"></HeartIcon>
                        My Watchlist
                    </div>
                    <div>
                        <div className="flex">
                            <div data-theme="cupcake" className="flex items-center mr-5">
                                <select
                                    className="select select-sm xl:select-md border-2 border-main rounded-xl leading-none 
                            focus:outline-0 text-gray-black focus:text-gray-black text-lg"
                                    value={JSON.stringify(sortCategory)}
                                    onChange={e => setSortCategory(JSON.parse(e.target.value))}
                                >
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "desc" })}>Newest</option>
                                    <option value={JSON.stringify({ by: "dateCreated", direction: "asc" })}>Oldest</option>
                                    <option value={JSON.stringify({ by: "product_name", direction: "asc" })}>A - Z</option>
                                    <option value={JSON.stringify({ by: "product_name", direction: "desc" })}>Z - A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {
                        products.length > 0 ?
                            products.map((product, key) => {
                                return <WatchlistCard
                                    product={product}
                                    key={key}
                                    onDeleteClick={() => handleOnWatchlistDelete(product.productId!)}></WatchlistCard>
                            }) :
                            <div>Nothing in watchlist!</div>
                    }
                </div>

                <div className="my-10 mx-auto">
                    <Pagination value={page} onChange={handlePageChange} total={totalPage}
                        radius={'xl'}
                        boundaries={5}
                        classNames={{ control: 'border-transparent' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Watchlist