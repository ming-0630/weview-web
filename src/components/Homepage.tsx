import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import smartphone from './../assets/smartphone 1.png';
import Category from "@/enums/category_enum";
import Product from "@/interfaces/product_interfaces";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ReactElement } from "react";

const page1 = (
    <div className='flex h-full'>
        <div className='flex flex-col justify-center w-1/2 pl-40 mb-16'>
            <div className='text-7xl'>
                <span>Welcome to &nbsp;</span><span className='text-main font-bold -ml-4'>WeView</span>
            </div>
            <div className='font-light text-3xl mt-3'>
                <span>Your one-stop review platform for all tech products and electronics</span>
            </div>
            <div className='mt-3 w-1/2'>
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

const trendingProducts: ReactElement[] = [];
const testProduct: Product = {
    name: 'iPhone 14 Pro',
    type: Category.Smartphones,
    rating: 0
}

for (let index = 0; index < 4; index++) {
    trendingProducts.push(<ProductCard product={testProduct}></ProductCard>)

}

const page2 = (
    <div className='flex flex-col h-screen items-center m-auto p-20 w-4/5'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-6xl'>Trending</span>
            <span className='text-3xl mt-5 text-black/60'>Find out what's the recent buzz</span>
        </div>

        <div className='flex pt-12 justify-between w-full'>
            {trendingProducts}
        </div>
        <div className='flex pt-7 w-full justify-end'>
            <div className='cursor-pointer flex'>
                <span>View All</span> <ChevronRightIcon className='w-4 ml-1' ></ChevronRightIcon>
            </div>

        </div>

    </div>
)

const page3 = (
    <div className='flex flex-col h-full'>
        <div className='flex flex-col w-full items-center mt-8'>
            <span className='text-6xl'>Trending</span>
            <span className='text-3xl mt-5 text-black/60'>Find out what's the recent buzz</span>
        </div>

        <div className='flex pt-7 justify-center'>
            {trendingProducts}
        </div>

    </div>
)

const HomePage = () => {

    return (
        <div className='h-full'>
            <div className='bg-white pt-28 h-full'>
                {page1}
            </div>
            <div className='bg-white bg-gradient-to-b from-main'>
                {page2}
                {page3}
            </div>

        </div>
    );
}

export default HomePage;
