import ProductDetailsBg from "@/components/ui/ProductDetailsBg";
import Product from "@/interfaces/productInterface";
import { getProductDetails } from "@/services/product/services";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import FadedLine from '../../../assets/faded-line.svg';
import { useEffect, useState } from "react";
import Image from "next/image"

interface ProductDetailsPageProps {
    id: string | string[]
}

const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    const getProduct = () => {
        setIsLoading(true);
        const fetchData = async () => {
            let response = await getProductDetails(props.id.toString());

            if (response && response.data) {
                setProduct(response.data);
            }
        }
        fetchData().catch(console.error)
        setIsLoading(false);
    }

    // On Props change
    useEffect(() => {
        getProduct();
    }, [props])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="h-[calc(100vh_-_5rem)] w-full overflow-hidden relative">
                <ProductDetailsBg className="w-full absolute" viewBox="0 0 1920 1080"></ProductDetailsBg>
                <div className="relative flex h-full items-center px-32 gap-20">
                    <div className="bg-white rounded-3xl basis-1/4 h-[50vh]">
                        test
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
                            <button className="flex text-main bg-white p-5 rounded-2xl items-center text-xl font-semibold">
                                <ArrowDownIcon className="w-7 mr-2"></ArrowDownIcon>
                                Show Reviews
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col p-10 items-center min-h-[calc(100vh_-_5rem)]">
                <div className="font-semibold text-4xl mb-6">Product Details</div>
                <div className="relative w-[45%] h-2">
                    <Image src={FadedLine} fill alt={""}></Image>
                </div>
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
                    <button className="btn mt-5 btn-ghost border-main border-2 px-5
                    hover:text-white hover:bg-main
                    ">View Product Website</button>
                </div>
            </div>
            <div className="w-full relative overflow-hidden">
                <div className="h-[20vh]">
                    <ProductDetailsBg className="w-full absolute object-contain" viewBox="0 0 1920 1080"></ProductDetailsBg>
                </div>
                <div className="bg-white h-screen rounded-xl relative">
                    test
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
