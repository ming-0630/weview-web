import ProductCard from "@/components/layout/product-card/ProductCardOri";
import SearchInput from "@/components/ui/SearchInput";
import smartphone from '../../../assets/smartphone 1.png';
import smartphoneCategory from '../../../assets/smartphone.jpg';
import musicCategory from '../../../assets/music.jpg';
import allCategory from '../../../assets/all.jpg';
import homeCategory from '../../../assets/home.jpg';
import computerCategory from '../../../assets/computers.jpg';
import Category from "@/enums/category_enum";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Carousel from "../../ui/Carousell";
import CategoriesImage from "./Categories/CategoriesImage";

const page1 = (
    <div className='flex h-[calc(100vh_-_5rem)]'>
        <div className='flex flex-col justify-center w-1/2 pl-20 lg:pl-40 mb-16 flex justify-start'>
            <div className='text-4xl lg:text-6xl xl:text-7xl'>
                <div>Welcome to &nbsp;</div><div className='text-main font-bold'>WeView</div>
            </div>
            <div className='font-light text-xl lg:text-2xl xl:text-3xl mt-3'>
                <span>Your one-stop review platform for all tech products and electronics</span>
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

const trendingProducts: ReactElement[] = [];
const testProduct = (index: number) => {
    return {
        name: 'iPhone 14 Pro ' + index,
        type: Category.Smartphones,
        rating: 0
    }
}

for (let index = 0; index < 10; index++) {
    trendingProducts.push(<div className="mx-5 p-3 w-72" key={index}>
        <ProductCard product={testProduct(index)} image={smartphone}></ProductCard>
    </div>)

}

const page2 = (
    <div className='flex flex-col items-center m-auto py-32 w-11/12 xl:w-5/6'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-5xl'>Trending</span>
            <span className='text-xl mt-5 text-black/60'>Find out what's the recent buzz</span>
        </div>

        <div className='flex flex-col justify-center w-full h-3/5 pt-16'>
            <Carousel align='start' slidesToScroll={1}>
                {trendingProducts}
            </Carousel>
        </div>
        <div className='flex w-full justify-end mr-16 pt-12'>
            <div className='cursor-pointer flex text-xl'>
                <span>View All</span> <ChevronRightIcon className='w-5 ml-2' ></ChevronRightIcon>
            </div>
        </div>

    </div>
)

const page3 = (
    <div className='flex flex-col w-5/6 items-center m-auto h-screen'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-5xl'>Categories</span>
        </div>
        <div className="mt-16 w-full flex h-4/5">
            <div className=" m-2 w-1/3">
                <CategoriesImage title='SMARTPHONES'>
                    <Image src={smartphoneCategory} alt="Smartphone Image" fill className="object-cover" />
                </CategoriesImage>
            </div>

            <div className="flex flex-col basis-2/3 h-full">
                <div className="m-2 flex h-1/2">
                    <div className="basis-2/5 mr-4 relative">
                        <CategoriesImage title="MUSIC">
                            <Image src={musicCategory} alt="Music Image" fill className="object-cover" />
                        </CategoriesImage>
                    </div>
                    <div className="basis-3/5 relative">
                        <CategoriesImage title="COMPUTER">
                            <Image src={computerCategory} alt="Computer Image" fill className="object-cover" />
                        </CategoriesImage>
                    </div>
                </div>
                <div className="m-2 flex h-1/2">
                    <div className="basis-3/5 mr-4 relative">
                        <CategoriesImage title="HOME APPLIANCES">
                            <Image src={homeCategory} alt="Home Appliances Image" fill className="object-cover" />
                        </CategoriesImage>
                    </div>
                    <div className="basis-2/5 relative">
                        <CategoriesImage title="ALL">
                            <Image src={allCategory} alt="All Categories Image" fill className="object-cover" />
                        </CategoriesImage>
                    </div>
                </div>
            </div>

        </div>
    </div>
)

const HomePage = () => {

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
