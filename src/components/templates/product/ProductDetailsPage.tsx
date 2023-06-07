import FadedLine from "@/components/ui/FadedLine";
import ProductDetailsBg from "@/components/ui/ProductDetailsBg";
import Product from "@/interfaces/productInterface";
import { getProductDetails } from "@/services/product/services";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { SortProps } from "./ProductListPage";
import { useAuthStore } from "@/states/authStates";
import ReviewBlock from "../review/ReviewBlock";
import Carousel from "@/components/ui/Carousell";
import Image from "next/image";
import { Rating } from "@mantine/core";

interface ProductDetailsPageProps {
    id: string | string[]
}

const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "name", direction: "asc" });

    const user = useAuthStore((state) => state.loggedInUser);

    Chart.register(CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend);
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    const getProduct = () => {
        setIsLoading(true);
        const fetchData = async () => {
            let response = await getProductDetails(props.id.toString());

            if (response && response.data) {
                setProduct(response.data);
                console.log(response.data)
            }
        }
        fetchData().catch(console.error)
        setIsLoading(false);
    }

    // On Props change
    useEffect(() => {
        if (props.id) {
            getProduct();
        }

    }, [props])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="h-[calc(100vh_-_5rem)] w-full overflow-hidden relative">
                <ProductDetailsBg className="w-full absolute" viewBox="0 0 1920 1080"></ProductDetailsBg>
                <div className="relative flex h-full items-center px-32 gap-20">
                    <div className="bg-white rounded-3xl basis-1/4">
                        <Carousel align='start' slidesToScroll={1} hasButtons loop>
                            {product?.images?.map((img, i) => {
                                return (
                                    <div className="h-[45vh] flex-[0_0_100%] relative" key={i}>
                                        <Image src={img} alt={""} fill className="object-contain p-10" />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="flex flex-col grow gap-2 text-white">
                        <span className="text-7xl font-semibold">{product?.name}</span>
                        <Link href={'/products/' + product?.category?.toString().toLowerCase()} className="mt-2">
                            <span className='font-medium text-3xl hover:underline uppercase opacity-70'>
                                {product?.category && product.category}
                            </span>
                        </Link>
                        <hr className="border-none h-1 bg-white/50 rounded my-2"></hr>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1 items-center">
                                <div className="flex gap-2">
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                </div>
                                <div className="text-xl">{"( 6.9k Ratings )"}</div>
                            </div>
                            <Link href="#review-section">
                                <button className="flex text-main bg-white p-5 rounded-2xl items-center text-xl font-semibold">
                                    <ArrowDownIcon className="w-7 mr-2"></ArrowDownIcon>
                                    Show Reviews
                                </button>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col p-10 items-center min-h-[calc(100vh_-_5rem)] justify-center">
                <div className="font-semibold text-4xl mb-6">Product Details</div>
                <FadedLine></FadedLine>
                <div className="mt-5">
                    <span>Released in: {product?.releaseYear}</span>
                </div>
                <div className="max-w-[70%] text-justify font-sans mt-5 flex flex-col items-center"
                    style={{
                        whiteSpace: "pre-wrap"
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales magna at enim posuere condimentum. Curabitur aliquet aliquet tellus a aliquet. Aenean scelerisque lectus consectetur ante pretium, eu tincidunt ante feugiat. Cras porta eget dolor sed porta. Ut tempus magna at neque vulputate, nec interdum neque convallis. Donec eget elementum felis, non hendrerit sem. Maecenas semper, ipsum id venenatis porta, felis sapien interdum nulla, et vulputate odio justo sit amet lorem. Praesent eu velit rhoncus, euismod massa sit amet, luctus tortor. Nullam nec lobortis metus, et interdum est. Donec pretium lacus vitae fringilla efficitur. Suspendisse potenti. Quisque nec nunc eu ex semper blandit. Nunc et ante ex.

                    Nulla vel convallis est. Vivamus hendrerit scelerisque consectetur. In mattis urna condimentum facilisis bibendum. Praesent vel risus ullamcorper, auctor sapien id, tristique leo. Nunc volutpat nulla a magna ullamcorper sodales. Aenean erat velit, luctus eu est sit amet, facilisis mollis sem. Praesent eu lectus a nulla tempor consequat sed ornare nibh. Morbi maximus faucibus nunc et imperdiet. Nulla facilisi. Donec aliquet ligula et nunc dignissim, ac rutrum sapien sagittis. Vivamus luctus interdum orci, nec sagittis purus scelerisque quis. Sed ultrices eget lacus quis maximus. In hac habitasse platea dictumst.

                    Vestibulum sed ullamcorper neque. Nullam posuere vitae felis nec hendrerit. Suspendisse eget accumsan mauris, ac malesuada purus. Aenean et imperdiet lectus, at vulputate sapien. Integer in dui iaculis, dictum elit et, ullamcorper mi. Nam varius nulla aliquam vulputate lacinia. Curabitur vulputate urna et commodo feugiat. Nunc vel nibh eget arcu malesuada sodales vehicula ut tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat.

                    Ut nec sem ut nisi semper rutrum id non elit. Curabitur tellus lacus, mollis ut gravida at, accumsan ac arcu. Nunc sit amet mattis mauris. Sed venenatis massa at nulla placerat volutpat. In egestas venenatis ante, non varius quam porttitor ac. Quisque in elit felis. Ut consequat dictum est.
                    <Link href=''>
                        <button className="btn mt-5 btn-ghost border-main border-2 px-5 hover:text-white hover:bg-main">
                            View Product Website
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full relative" id="review-section">
                <div className="h-[20vh] relative flex w-full">
                    <ProductDetailsBg className="w-full absolute object-contain" viewBox="0 0 1920 1080"></ProductDetailsBg>
                    <span className="text-white text-7xl font-semibold absolute bottom-0 right-[5vw]">Reviews</span>
                </div>
                <div className="bg-white min-h-screen rounded-3xl relative py-16">
                    <div className="m-auto w-[60vw] flex flex-col gap-12">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-5">
                                    <div className="text-main font-bold text-6xl">5.00</div>
                                    <Rating defaultValue={5}></Rating>
                                </div>
                                <div className="text-main">Based on 6969 Reviews</div>
                            </div>
                            <Link href={'/products/reviews/add/' + product?.productId}>
                                <button className="btn btn-primary text-white">Write a Review</button>
                            </Link>
                        </div>

                        <FadedLine className="w-full"></FadedLine>

                        <div className="flex flex-col">
                            <div className="text-main font-semibold text-3xl">Ratings Breakdown</div>
                            <div className="flex mt-5 items-center">
                                <div className="flex flex-col gap-2 basis-1/3">
                                    <div>
                                        <div className="text-main">5 Stars</div>
                                        <div className="flex items-center gap-3">
                                            <progress className="progress progress-warning w-56" value={0} max="100"></progress>
                                            <div className="text-main text-sm">0%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-main">4 Stars</div>
                                        <div className="flex items-center gap-3">
                                            <progress className="progress progress-warning w-56" value="10" max="100"></progress>
                                            <div className="text-main text-sm">10%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-main">3 Stars</div>
                                        <div className="flex items-center gap-3">
                                            <progress className="progress progress-warning w-56" value="40" max="100"></progress>
                                            <div className="text-main text-sm">40%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-main">2 Stars</div>
                                        <div className="flex items-center gap-3">
                                            <progress className="progress progress-warning w-56" value="70" max="100"></progress>
                                            <div className="text-main text-sm">70%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-main">1 Stars</div>
                                        <div className="flex items-center gap-3">
                                            <progress className="progress progress-warning w-56" value="100" max="100"></progress>
                                            <div className="text-main text-sm">50%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grow">
                                    <Line
                                        datasetIdKey='id-00'
                                        data={{
                                            labels: data.map(row => row.year),
                                            datasets: [{
                                                label: 'Acquisitions by year',
                                                data: data.map(row => row.count),
                                                fill: false,
                                                borderColor: '#F88379',
                                                tension: 0.1
                                            }]
                                        }}
                                    ></Line>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-main font-semibold text-3xl self-end">Price Breakdown</div>
                            <div className="flex mt-5 items-center gap-5">
                                <div className="grow">
                                    <Line
                                        datasetIdKey='id-00'
                                        data={{
                                            labels: data.map(row => row.year),
                                            datasets: [{
                                                label: 'Acquisitions by year',
                                                data: data.map(row => row.count),
                                                fill: false,
                                                borderColor: '#F88379',
                                                tension: 0.1
                                            }]
                                        }}
                                    ></Line>
                                </div>
                                <div className="flex flex-col gap-2 basis-1/3" data-theme="corporate">
                                    <div className="stats stats-vertical bg-white text-main border border-main rounded-lg">
                                        <div className="stat">
                                            <div className="stat-title text-main">Average Price</div>
                                            <div className="stat-value">31K</div>
                                            <div className="stat-desc">Jan 1st - Feb 1st</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-title text-main">Range of Prices</div>
                                            <div className="stat-value">4,200</div>
                                            <div className="stat-desc">↗︎ 400 (22%)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FadedLine className="w-full"></FadedLine>

                        <div className="flex flex-col">
                            <div data-theme="cupcake" className="flex items-center mr-5 self-end">
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
                                </select>
                            </div>
                        </div>
                        <ReviewBlock user={user!}></ReviewBlock>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductDetailsPage;
