import ProductCard from "@/components/layout/productCard/ProductCardOri";
import SearchInput from "@/components/ui/SearchInput";
import Category from "@/enums/categoryEnum";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import allCategory from '../../../assets/all.jpg';
import computerCategory from '../../../assets/computers.jpg';
import homeCategory from '../../../assets/home.jpg';
import musicCategory from '../../../assets/music.jpg';
import smartphone from '../../../assets/smartphone 1.png';
import smartphoneCategory from '../../../assets/smartphone.jpg';
import Carousel from "../../ui/Carousell";
import CategoriesImage from "./categories/CategoriesImage";
import Product from "@/interfaces/productInterface";
import { useGlobalStore } from "@/states/globalStates";
import { getAllFeaturedProducts } from "@/services/product/services";
import useStore from "@/utils/useStore";
import { useAuthStore } from "@/states/authStates";
import { addToWatchlist } from "@/services/user/services";
import { toast } from "react-toastify";
import CustomToastError from "@/utils/CustomToastError";

const page1 = (
    <div className='flex h-[calc(100vh_-_5rem)]'>
        <div className='flex flex-col justify-center w-1/2 pl-20 lg:pl-40 mb-16 flex justify-start'>
            <div className='text-4xl lg:text-6xl xl:text-7xl'>
                <div>{"Welcome to "}&nbsp;</div><div className='text-main font-bold'>WeView</div>
            </div>
            <div className='font-light text-xl lg:text-2xl xl:text-3xl mt-3'>
                <span>{"Your one-stop review platform for all tech products and electronics"}</span>
            </div>
            <div className='mt-3 w-full lg:w-2/3 xl:w-1/2'>
                <SearchInput></SearchInput>
            </div>

        </div>
        <div className='flex flex-col justify-center w-1/2 h-full'>
            <div className='flex justify-center relative'>
                <Image src='/../public/hexagon.png' alt="Hexagon Background" className='w-3/5' width={500} height={500} />
                <Image src={smartphone} alt="Smartphone" className='w-2/5 absolute mt-7' width={500} height={500} />

            </div>
        </div>
    </div>
)

// const trendingProducts: ReactElement[] = [];
// const testProduct = (index: number) => {
//     return {
//         name: 'iPhone 14 Pro ' + index,
//         type: Category.SMARTPHONES,
//         rating: 0
//     }
// }

// for (let index = 0; index < 10; index++) {
//     trendingProducts.push(
//         <Link href={"/product-details-page"} className="mx-5 p-3 w-72" key={index}>
//             <ProductCard product={testProduct(index)} image={smartphone}></ProductCard>
//         </Link>)

// }

const page3 = (
    <div className='flex flex-col w-5/6 items-center m-auto h-[calc(100vh_-_5rem)]'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-5xl'>Categories</span>
        </div>
        <div className="mt-16 w-full flex h-4/5">
            <div className=" m-2 w-1/3">
                <Link href={"/products/smartphones"}>
                    <CategoriesImage title='SMARTPHONES'>
                        <Image src={smartphoneCategory} alt="Smartphone Image" fill className="object-cover" />
                    </CategoriesImage>
                </Link>
            </div>

            <div className="flex flex-col basis-2/3 h-full">
                <div className="m-2 flex h-1/2">
                    <div className="basis-2/5 mr-4 relative">
                        <Link href={"/products/music"}>
                            <CategoriesImage title="MUSIC">
                                <Image src={musicCategory} alt="Music Image" fill className="object-cover" />
                            </CategoriesImage>
                        </Link>
                    </div>
                    <div className="basis-3/5 relative">
                        <Link href={"/products/computers"}>
                            <CategoriesImage title="COMPUTER">
                                <Image src={computerCategory} alt="Computer Image" fill className="object-cover" />
                            </CategoriesImage>
                        </Link>
                    </div>
                </div>
                <div className="m-2 flex h-1/2">
                    <div className="basis-3/5 mr-4 relative">
                        <Link href={"/products/homeappliances"}>
                            <CategoriesImage title="HOME APPLIANCES">
                                <Image src={homeCategory} alt="Home Appliances Image" fill className="object-cover" />
                            </CategoriesImage>
                        </Link>
                    </div>
                    <div className="basis-2/5 relative">
                        <Link href={"/products/all"}>
                            <CategoriesImage title="ALL">
                                <Image src={allCategory} alt="All Categories Image" fill className="object-cover" />
                            </CategoriesImage>
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    </div>
)

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>()
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const user = useStore(useAuthStore, (state) => state.loggedInUser)
    const toggleLogin = useGlobalStore((state) => state.toggleLogin)

    useEffect(() => {
        getFeaturedProducts()
    }, [])

    const handleOnWatchlistClick = async (productId: string) => {
        loadingHandler.open();
        if (user) {
            const response = await addToWatchlist(productId, user?.id)
            if (response && response.status == 200 && response.data) {
                toast.success(response.data);
                getFeaturedProducts();
            }
        } else {
            CustomToastError("Please login to add to watchlist");
            loadingHandler.close();
            toggleLogin();
            return;
        }
        loadingHandler.close();
    }

    const getFeaturedProducts = async () => {
        try {
            loadingHandler.open();
            const response = await getAllFeaturedProducts();

            if (response && response.data) {
                setProducts(response.data)
            }
        } finally {
            loadingHandler.close()
        }
    }

    const page2 = (<div className='flex flex-col items-center m-auto py-32 w-11/12 xl:w-5/6'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-5xl'>Featured</span>
            <span className='text-xl mt-5 text-black/60'>{"Find out what's the recent buzz"}</span>
        </div>

        <div className='flex flex-col justify-center w-full h-3/5 pt-16'>
            <Carousel align='start' slidesToScroll={1}>
                {products?.map((product) => {
                    return (
                        <div className="p-5" key={product.productId}>
                            <ProductCard product={product}
                                onWatchlistClick={() => handleOnWatchlistClick(product.productId!)}></ProductCard>
                        </div>
                    )
                })}
            </Carousel>
        </div>
        <div className='flex w-full justify-end mr-16 pt-12'>
            <div className='cursor-pointer flex text-xl'>
                <span>View All</span> <ChevronRightIcon className='w-5 ml-2' ></ChevronRightIcon>
            </div>
        </div>
    </div>
    )

    return (
        <div>
            {page1}
            <div className='bg-gradient-to-b from-main'>
                {page2}
                {page3}
            </div>

        </div>
    );
}

export default HomePage;
