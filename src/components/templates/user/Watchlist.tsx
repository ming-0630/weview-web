import WatchlistCard from "@/components/layout/productCard/WatchlistCard"
import Product from "@/interfaces/productInterface";
import { HeartIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SortProps } from "../product/ProductListPage";
import { LoadingOverlay, Pagination } from "@mantine/core";
import { addToWatchlist, fetchWatchlist } from "@/services/user/services";
import useStore from "@/utils/useStore";
import { useAuthStore } from "@/states/authStates";
import { toast } from "react-toastify";

const Watchlist = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "dateCreated", direction: "desc" });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const user = useStore(useAuthStore, (state) => state.loggedInUser)

    const [isLoading, handlers] = useDisclosure(false);

    const getWatchlist = async (page: number, sortCategory: SortProps) => {
        if (user) {
            handlers.open();
            try {
                const response = await fetchWatchlist(
                    user?.id,
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
                handlers.close();
            }
        }
    }

    const handleOnWatchlistDelete = async (productId: string) => {
        if (user) {
            const response = await addToWatchlist(productId, user?.id)

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
        setPage(1);
        getWatchlist(1, sortCategory);
    }, [sortCategory, user])

    // On page change
    useEffect(() => {
        getWatchlist(page, sortCategory);
    }, [page])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="md:w-2/3 m-auto p-16 flex flex-col gap-5">
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
                <div>
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

                <div className="mt-10 mx-auto">
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