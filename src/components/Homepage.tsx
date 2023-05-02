import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import smartphone from './../assets/smartphone 1.png';
import smartphoneCategory from './../assets/smartphone.jpg';
import musicCategory from './../assets/music.jpg';
import allCategory from './../assets/all.jpg';
import homeCategory from './../assets/home.jpg';
import computerCategory from './../assets/computers.jpg';
import smartphoneCategoryBW from './../assets/smartphone_b&w.png';
import musicCategoryBW from './../assets/music_b&w.png';
import allCategoryBW from './../assets/all_b&w.png';
import homeCategoryBW from './../assets/home_b&w.png';
import computerCategoryBW from './../assets/computers_b&w.png';
import Category from "@/enums/category_enum";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ReactElement } from "react";
import Carousel from "./Carousell";

const page1 = (
    <div className='flex h-[calc(100vh_-_5rem)]'>
        <div className='flex flex-col justify-center w-1/2 pl-40 mb-16'>
            <div className='text-4xl lg:text-6xl xl:text-7xl'>
                <span>Welcome to &nbsp;</span><span className='text-main font-bold -ml-4'>WeView</span>
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
    trendingProducts.push(<div className="w-[calc(100vw_*_20/100)] xl:w-[calc(100vw_*_15/100)]  h-[calc(100vw_*_20/100)] mx-10 p-3" key={index}>
        <ProductCard product={testProduct(index)}></ProductCard>
    </div>)

}

const page2 = (
    <div className='flex flex-col items-center m-auto py-24 w-5/6'>
        <div className='flex flex-col w-full items-center'>
            <span className='text-5xl'>Trending</span>
            <span className='text-xl mt-5 text-black/60'>Find out what's the recent buzz</span>
        </div>

        <div className='flex flex-col justify-center w-full h-3/5 pt-16'>
            <Carousel align='start' slidesToScroll={4}>
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
            <div className=" m-2 w-1/3 relative"
                onMouseEnter={() => { }}
                onMouseLeave={() => { }}>
                <Image src={smartphoneCategory} alt="Smartphone Image" fill className="object-cover" />
                <span className="text-main text-3xl font-medium absolute bottom-5 right-5 ">SMARTPHONES</span>
            </div>

            <div className="flex flex-col basis-2/3 h-full">
                <div className="m-2 flex h-1/2">
                    <div className="bg-red-500 basis-2/5 mr-4 relative">
                        <Image src={musicCategory} alt="Music Image" fill className="object-cover" />
                        <span className="text-main text-3xl font-medium absolute bottom-5 right-5 ">MUSIC</span>
                    </div>
                    <div className="bg-yellow-500 basis-3/5 relative">
                        <Image src={computerCategory} alt="Computer Image" fill className="object-cover" />
                        <span className="text-main text-3xl font-medium absolute bottom-5 right-5 ">COMPUTER</span>
                    </div>
                </div>
                <div className="m-2 flex h-1/2">
                    <div className="bg-red-500 basis-3/5 mr-4 relative">
                        <Image src={homeCategory} alt="Home Appliances Image" fill className="object-cover" />
                        <span className="text-main text-3xl font-medium absolute bottom-5 right-5 ">HOME APPLIANCES</span>
                    </div>
                    <div className="basis-2/5 relative">
                        <Image src={allCategory} alt="All Categories Image" fill className="object-cover" />
                        <span className="text-main text-3xl font-medium absolute bottom-5 right-5 ">ALL</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
)

const HomePage = () => {

    return (
        <div className='w-screen'>
            <div className='bg-white'>
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
